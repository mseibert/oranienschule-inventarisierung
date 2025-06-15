import { h as decodeKey } from './chunks/astro/server_CRzYADk7.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_C6XOTx3h.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/martinseibert/Documents/code/inventar/","cacheDir":"file:///Users/martinseibert/Documents/code/inventar/node_modules/.astro/","outDir":"file:///Users/martinseibert/Documents/code/inventar/dist/","srcDir":"file:///Users/martinseibert/Documents/code/inventar/src/","publicDir":"file:///Users/martinseibert/Documents/code/inventar/public/","buildClientDir":"file:///Users/martinseibert/Documents/code/inventar/dist/client/","buildServerDir":"file:///Users/martinseibert/Documents/code/inventar/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.9.2_@types+node@22.15.30_jiti@2.4.2_lightningcss@1.30.1_rollup@4.42.0_typescript@5.8.3_yaml@2.8.0/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/feedback","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/feedback\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"feedback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/feedback.ts","pathname":"/api/feedback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/register.ts","pathname":"/api/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.DLIRdi1i.css"}],"routeData":{"route":"/form","isIndex":false,"type":"page","pattern":"^\\/form\\/?$","segments":[[{"content":"form","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/form.astro","pathname":"/form","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/martinseibert/Documents/code/inventar/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/martinseibert/Documents/code/inventar/src/pages/[...slug].astro",{"propagation":"none","containsHead":true}],["/Users/martinseibert/Documents/code/inventar/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/martinseibert/Documents/code/inventar/src/pages/form.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/[...slug]@_@astro":"pages/_---slug_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/feedback@_@ts":"pages/api/feedback.astro.mjs","\u0000@astro-page:src/pages/api/register@_@ts":"pages/api/register.astro.mjs","\u0000@astro-page:src/pages/form@_@astro":"pages/form.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.9.2_@types+node@22.15.30_jiti@2.4.2_lightningcss@1.30.1_rollup@4.42.0_typescript@5.8.3_yaml@2.8.0/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/martinseibert/Documents/code/inventar/node_modules/.pnpm/astro@5.9.2_@types+node@22.15.30_jiti@2.4.2_lightningcss@1.30.1_rollup@4.42.0_typescript@5.8.3_yaml@2.8.0/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_D7Ci2q5S.mjs","/Users/martinseibert/Documents/code/inventar/src/assets/logo.png":"chunks/logo_D5TssK6v.mjs","\u0000@astrojs-manifest":"manifest_CUkFCmOl.mjs","/Users/martinseibert/Documents/code/inventar/src/pages/form.astro?astro&type=script&index=0&lang.ts":"_astro/form.astro_astro_type_script_index_0_lang.jh5aslOQ.js","/Users/martinseibert/Documents/code/inventar/src/components/Inventar.astro?astro&type=script&index=0&lang.ts":"_astro/Inventar.astro_astro_type_script_index_0_lang.BeZVdRQp.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/martinseibert/Documents/code/inventar/src/pages/form.astro?astro&type=script&index=0&lang.ts","document.getElementById(\"submitButton\")?.addEventListener(\"click\",async r=>{r.preventDefault();const n=document.querySelector(\"input[name=email]\"),e=document.getElementById(\"submitButton\");try{e.disabled=!0,e.textContent=\"Sending...\";const t=await fetch(\"/api/register\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({email:n?.value||\"\"})}),o=await t.json();t.ok?(alert(\"Registration successful!\"),n.value=\"\"):alert(\"Registration failed: \"+(o.error||\"Unknown error\"))}catch(t){console.error(\"Error submitting form:\",t),alert(\"An error occurred while submitting the form. Please try again.\")}finally{e.disabled=!1,e.textContent=\"Register\"}});"],["/Users/martinseibert/Documents/code/inventar/src/components/Inventar.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"click\",t=>{const s=t.target;s.classList.contains(\"fixed\")&&s.classList.contains(\"inset-0\")&&s.classList.add(\"hidden\")});"]],"assets":["/_astro/background.BWfwNc5W.svg","/_astro/logo.k-LAeJkM.png","/_astro/_slug_.DLIRdi1i.css","/favicon.svg","/404.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"A46w7iiTFgqoJACP8GD5vthOd9i5XTkgFBIUH2pH8ws="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
