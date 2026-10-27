// The request URL, never forwarded host headers, determines indexability.
export const PRODUCTION_HOST = 'www.ninedr.com';
export function isProduction(request) {
  return new URL(request.url).hostname === PRODUCTION_HOST;
}

export function applyIndexingPolicy(request, response) {
  const production = isProduction(request);
  const html = (response.headers.get('content-type') || '').includes('text/html');
  const verification = new URL(request.url).pathname === '/googleb357467bdf4840d3.html';
  const success = response.status >= 200 && response.status < 300;
  const directive = production && success ? 'index, follow' : 'noindex, follow';
  const result = new Response(response.body, response);
  if (!production || html) result.headers.set('X-Robots-Tag', directive);
  // Preserve Google's exact verification body and non-HTML assets.
  if (!html || verification || request.method === 'HEAD') return result;
  // Errors retain their framework-generated noindex. Preview always overrides
  // page-level metadata, including articles that explicitly request indexing.
  if (production && !success) return result;
  return new HTMLRewriter()
    .on('meta', {element(element) {
      const name = (element.getAttribute('name') || '').toLowerCase();
      if (['robots', 'googlebot', 'bingbot'].includes(name)) element.remove();
    }})
    .on('head', {element(element) {
      element.append(`<meta name="robots" content="${directive}">`, {html:true});
    }})
    .transform(result);
}
