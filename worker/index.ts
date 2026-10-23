import handler from "vinext/server/fetch-handler";
import {handleContact} from "../lib/contact-handler.mjs";
export default {
 fetch(request:Request,env:Record<string,unknown>,ctx:ExecutionContext){
  if(new URL(request.url).pathname==="/api/contact")return handleContact(request,env);
  return handler.fetch(request,env,ctx);
 }
};
