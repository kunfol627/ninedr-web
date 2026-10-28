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
  const response=applyIndexingPolicy(request,await handler.fetch(request,env,ctx));
  // Finish the small homepage HTML stream before sending it to preview clients.
  // Preserve the exact document and hostname-based robots policy. Never buffer
  // RSC navigation, errors, non-GET requests, or other routes.
  if(new URL(request.url).pathname==="/" && request.method==="GET" && response.status===200 &&
     (response.headers.get("content-type")||"").includes("text/html") &&
     !response.headers.has("content-encoding")){
   const body=await response.arrayBuffer();
   const headers=new Headers(response.headers);
   headers.delete("transfer-encoding");
   headers.set("content-length",String(body.byteLength));
   headers.set("x-share-response","complete-html-v1");
   return new Response(body,{status:response.status,statusText:response.statusText,headers});
  }
  return response;
 }
};
