import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { h as server_default, i as deserializeManifest } from './chunks/astro.360f122a.mjs';
import { _ as _page0, a as _page1, b as _page2, c as _page3, d as _page4 } from './chunks/pages/all.d9ed5813.mjs';
import 'mime';
import 'cookie';
import 'kleur/colors';
import 'slash';
import 'path-to-regexp';
import 'html-escaper';
import 'string-width';
/* empty css                                 */import 'ua-parser-js';
import '@astrojs/rss';
/* empty css                                     */
const pageMap = new Map([["src/pages/index.astro", _page0],["src/pages/rss.xml.js", _page1],["src/pages/about.astro", _page2],["src/pages/blog/index.astro", _page3],["src/pages/blog/[...slug].astro", _page4],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),];

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":["/_astro/about.5fb407b7.css","/_astro/_...slug_.f3e370c8.css"],"scripts":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/rss.xml","type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["/_astro/about.5fb407b7.css","/_astro/_...slug_.f3e370c8.css"],"scripts":[],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["/_astro/about.5fb407b7.css","/_astro/_...slug_.f3e370c8.css"],"scripts":[],"routeData":{"route":"/blog","type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["/_astro/about.5fb407b7.css","/_astro/_...slug_.f3e370c8.css"],"scripts":[],"routeData":{"route":"/blog/[...slug]","type":"page","pattern":"^\\/blog(?:\\/(.*?))?\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/blog/[...slug].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"site":"https://vectos.net","base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-light","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"gfm":true,"smartypants":true},"pageMap":null,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/mark/Projects/Personal/markdejong.org/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-pages-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/mark/Projects/Personal/markdejong.org/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":false}],["/Users/mark/Projects/Personal/markdejong.org/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/a-functional-ecosystem.md?astroContent=true":"chunks/a-functional-ecosystem.f6d2b724.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/baremetalrust-esp32.md?astroContent=true":"chunks/baremetalrust-esp32.e3701026.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/machine_learning.md?astroContent=true":"chunks/machine_learning.8efa7b6e.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/oracle-testing.md?astroContent=true":"chunks/oracle-testing.2f24ef3e.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/saga.md?astroContent=true":"chunks/saga.c27473ce.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/teevy.md?astroContent=true":"chunks/teevy.5a876bab.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/telegram-bot-in-functional-scala.md?astroContent=true":"chunks/telegram-bot-in-functional-scala.94da263b.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/tracing.md?astroContent=true":"chunks/tracing.b39f7135.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/a-functional-ecosystem.md?astroPropagatedAssets=true":"chunks/a-functional-ecosystem.cf5d4fb9.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/baremetalrust-esp32.md?astroPropagatedAssets=true":"chunks/baremetalrust-esp32.ba458e4f.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/machine_learning.md?astroPropagatedAssets=true":"chunks/machine_learning.1731affa.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/oracle-testing.md?astroPropagatedAssets=true":"chunks/oracle-testing.75b785e7.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/saga.md?astroPropagatedAssets=true":"chunks/saga.67512290.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/teevy.md?astroPropagatedAssets=true":"chunks/teevy.ac9066f1.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/telegram-bot-in-functional-scala.md?astroPropagatedAssets=true":"chunks/telegram-bot-in-functional-scala.e2693665.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/tracing.md?astroPropagatedAssets=true":"chunks/tracing.67baa13d.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/a-functional-ecosystem.md":"chunks/a-functional-ecosystem.fab29346.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/baremetalrust-esp32.md":"chunks/baremetalrust-esp32.6dd6b75d.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/machine_learning.md":"chunks/machine_learning.cd594ae9.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/oracle-testing.md":"chunks/oracle-testing.d9d3295a.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/saga.md":"chunks/saga.af6a4543.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/teevy.md":"chunks/teevy.75d0b129.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/telegram-bot-in-functional-scala.md":"chunks/telegram-bot-in-functional-scala.a0c33cce.mjs","/Users/mark/Projects/Personal/markdejong.org/src/content/blog/tracing.md":"chunks/tracing.ef581a3e.mjs","astro:scripts/before-hydration.js":""},"assets":["/_astro/_...slug_.f3e370c8.css","/_astro/about.5fb407b7.css","/favicon.svg","/placeholder-about.jpg","/placeholder-hero.jpg","/placeholder-social.jpg","/img/bg.png","/img/bg.svg","/img/footer.svg","/img/hero.svg","/img/logo.png","/img/mark.jpg","/img/mark_avatar.jpg","/img/blog/banner_functional_scala.jpg","/img/blog/banner_saga.jpg","/img/blog/banner_telegram.png","/img/blog/esp32.jpeg","/img/blog/saga.png","/img/blog/test-oracle.png","/img/cert/ckad.png","/img/cert/coursera.png","/img/cert/nielsen-norman.png","/img/companies/dhl.png","/img/companies/ing.png","/img/companies/malmberg.svg","/img/companies/veon.png","/img/blog/ml/anomaly_detection.png","/img/blog/ml/banner.jpg","/img/blog/ml/kmeans_diagram.gif","/img/blog/ml/linear_regression.gif","/img/blog/ml/svm_guassian_kernel.png","/img/tech/akka.svg","/img/tech/angular.svg","/img/tech/docker.png","/img/tech/dotnet.svg","/img/tech/haskell.svg","/img/tech/java.png","/img/tech/js.png","/img/tech/k8.png","/img/tech/kafka.png","/img/tech/keycloak.png","/img/tech/pg.png","/img/tech/php.svg","/img/tech/react.svg","/img/tech/redis.png","/img/tech/scala.png","/img/tech/typelevel.svg","/img/tech/typescript.svg","/img/tech/zio.png","/img/blog/teevy/teevy_logo.png","/img/blog/teevy/teevy_webapp.png","/img/blog/tracing/effect_transform.png","/img/blog/tracing/trace.jpg","/img/blog/tracing/trace.png","/img/projects/saffier/banner.png","/img/projects/saffier/footer.png","/img/projects/saffier/landing.png","/img/projects/sbs/invoices.png","/img/projects/sbs/logo.png","/img/projects/sbs/prices.png","/img/projects/mdw/Agenda.png","/img/projects/mdw/Bezorgers.png","/img/projects/mdw/Dashboard.png","/img/projects/mdw/Materiaal.png","/img/projects/mdw/logo.png","/img/projects/mdw/logo.svg","/img/projects/teevy/banner.png","/img/projects/teevy/teevy.gif","/img/projects/teevy/teevy_logo.png","/img/projects/teevy/teevy_webapp.png"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};
const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap, renderers };
