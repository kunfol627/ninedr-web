export const MEASUREMENT_ID = 'G-S7TGMX204R';
// New purpose-specific choice: do not reuse consent from before GA4 was enabled.
export const CONSENT_KEY = 'ninedr-cookie-preference-v2';
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
export function validPreference(value, now = Date.now()) {
  return value && typeof value.analytics === 'boolean' && Number.isFinite(value.at) && value.at <= now && now - value.at < CONSENT_LIFETIME;
}
export function readPreference(storage, now = Date.now()) {
  try { const value = JSON.parse(storage.getItem(CONSENT_KEY) || 'null'); return validPreference(value, now) ? value : null; } catch { return null; }
}
const cleanUrl = value => { try { const u = new URL(value); return /^https?:$/.test(u.protocol) ? u.origin + u.pathname : ''; } catch { return ''; } };

export function createAnalytics(win, doc) {
  let consent = null, initialized = false, loaded = false, script, lastPage = '', expiry;
  const allowed = () => win.location.hostname === 'www.ninedr.com' && win.location.protocol === 'https:' && validPreference(consent) && consent.analytics === true;
  const command = (...args) => win.gtag?.(...args);
  const pageParams = () => ({page_location:cleanUrl(win.location.href),page_referrer:cleanUrl(doc.referrer),page_title:doc.title});
  function clearCookies() {
    // Only GA cookies belonging to this measurement stream, including the shared _ga client cookie.
    for (const part of doc.cookie.split(';')) {
      const name = part.trim().split('=')[0];
      if (name !== '_ga' && name !== '_ga_S7TGMX204R') continue;
      for (const domain of ['', '; domain=www.ninedr.com', '; domain=.ninedr.com']) doc.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax; Secure`;
    }
  }
  function disable() {
    win[`ga-disable-${MEASUREMENT_ID}`] = true;
    // Disable collection before updating the loaded Google tag.
    if (initialized) command('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    if (!loaded) {
      script?.remove();
      win.dataLayer?.splice(0);
      initialized = false;
    }
    lastPage = '';
    clearCookies();
  }
  function send(name, params) {
    if (!allowed()) { if (initialized) disable(); return false; }
    if (!initialized) return false;
    const page = pageParams();
    command('set',page);
    command('event',name,{...page,...params,send_to:MEASUREMENT_ID});
    return true;
  }
  function pageView() {
    const page = cleanUrl(win.location.href);
    if (!allowed() || page === lastPage) return false;
    if (send('page_view',{})) { lastPage = page; return true; }
    return false;
  }
  function setConsent(value) {
    consent = value;
    win.clearTimeout(expiry);
    if (!allowed()) { disable(); return; }
    // Browser timers overflow beyond about 24.8 days; recheck long-lived choices in bounded intervals.
    const scheduleExpiry = () => {
      const remaining = CONSENT_LIFETIME - (Date.now()-consent.at);
      expiry = win.setTimeout(()=>{
        if (validPreference(consent)) { scheduleExpiry(); return; }
        consent=null; disable(); win.dispatchEvent(new Event('ninedr-consent-expired'));
      },Math.min(Math.max(remaining,1),2147483647));
    };
    scheduleExpiry();
    win[`ga-disable-${MEASUREMENT_ID}`] = false;
    if (!initialized) {
      win.dataLayer = win.dataLayer || [];
      win.gtag = function() { win.dataLayer.push(arguments); };
      command('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      command('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      command('js',new Date());
      command('set',pageParams());
      command('config',MEASUREMENT_ID,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_domain:'www.ninedr.com'});
      initialized = true;
    } else command('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    if (!doc.querySelector('script[data-ninedr-analytics]')) {
      script = doc.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      script.dataset.ninedrAnalytics = 'true';
      script.onload = () => { loaded = true; };
      script.onerror = () => { script?.remove(); initialized = false; win.dataLayer?.splice(0); lastPage = ''; };
      doc.head.appendChild(script);
    }
    pageView();
  }
  return {
    setConsent,pageView,
    leadAccepted(responseOk, resultOk) { return responseOk === true && resultOk === true ? send('generate_lead',{form_id:'contact',method:'website_form'}) : false; },
    contactClick(href, placement='content') {
      let u;try {u=new URL(href,win.location.href);}catch{return false;}
      const method = u.protocol === 'mailto:' ? 'email' : u.protocol === 'tel:' ? 'phone' : u.protocol === 'https:' && ['line.me','lin.ee'].includes(u.hostname) ? 'line' : null;
      return method ? send('contact_click',{contact_method:method,placement:['header','footer','content'].includes(placement)?placement:'content'}) : false;
    },
    dispose(){win.clearTimeout(expiry);},
  };
}
let runtime;
export function getAnalytics() {
  if (typeof window === 'undefined') return null;
  return runtime ||= createAnalytics(window,document);
}
