import {applyIndexingPolicy} from "../lib/indexing-policy.mjs";
import handler from "vinext/server/fetch-handler";
import {handleContact} from "../lib/contact-handler.mjs";
export default {
 async fetch(request:Request,env:Record<string,unknown>,ctx:ExecutionContext){
  if(new URL(request.url).pathname==="/googleb357467bdf4840d3.html")return applyIndexingPolicy(request,new Response(request.method==="HEAD"?null:"google-site-verification: googleb357467bdf4840d3.html",{headers:{"Content-Type":"text/html; charset=utf-8"}}));
  if(new URL(request.url).pathname==="/api/contact")return handleContact(request,env);
  // Preserve Cloudflare's HTML aliases (/geo/, /golfkit/faq) before
  // falling through to the application router. ASSETS.fetch does not recurse.
  if((request.method==="GET" || request.method==="HEAD") && env.ASSETS){
   const asset=await (env.ASSETS as {fetch(request:Request):Promise<Response>}).fetch(request);
   if(asset.status!==404)return applyIndexingPolicy(request,asset);
   await asset.body?.cancel();
  }
  return applyIndexingPolicy(request,await handler.fetch(request,env,ctx));
 }
};
