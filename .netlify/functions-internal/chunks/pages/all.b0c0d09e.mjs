/* empty css                           */import { UAParser } from 'ua-parser-js';
import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, s as spreadAttributes, d as renderSlot, e as renderComponent, f as createCollectionToGlobResultMap, g as createGetCollection } from '../astro.360f122a.mjs';
import rss from '@astrojs/rss';
/* empty css                               */
const parse = (uastring) => {
  const ua = uastring ?? "";
  const result = new UAParser(ua).getResult();
  const browser = result.browser.name || "";
  const deviceType = result.device.type || "";
  const os = result.os.name || "";
  const engine = result.engine.name || "";
  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";
  const isIos = os === "iOS";
  const userAgent = Object.freeze({
    browser,
    deviceType,
    os,
    engine,
    isMobile,
    isTablet,
    isIos,
    source: ua,
    deviceVendor: result.device.vendor || null,
    osVersion: parseInt(result.os.version || "0", 10),
    browserVersion: parseFloat(result.browser.version || "0"),
    engineVersion: parseFloat(result.engine.version || "0"),
    isIphone: isMobile && isIos,
    isIpad: isTablet && isIos,
    isDesktop: !isMobile && !isTablet,
    isChrome: browser === "Chrome",
    isFirefox: browser === "Firefox",
    isSafari: browser === "Safari",
    isIE: browser === "IE",
    isEdge: browser === "Edge",
    isOpera: browser === "Opera",
    isMac: os === "Mac OS",
    isChromeOS: os === "Chromium OS",
    isWindows: os === "Windows",
    isAndroid: os === "Android"
  });
  return userAgent;
};

const useUserAgent = (ua) => parse(ua);

const $$Astro$8 = createAstro("https://example.com");
const $$HeaderLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$HeaderLink;
  const uaString = Astro2.request.headers.get("user-agent");
  const { isMobile } = useUserAgent(uaString);
  const { href, ...props } = Astro2.props;
  const { pathname } = Astro2.url;
  const isActive = href === pathname || href === pathname.replace(/\/$/, "");
  const baseStyles = !isMobile ? "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" : "block pl-3 pr-4 py-2 border-l-4 text-base font-medium";
  var activeStyles = "";
  if (!isMobile) {
    activeStyles = isActive ? "border-indigo-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";
  } else {
    activeStyles = isActive ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700";
  }
  const styles = baseStyles + " " + activeStyles;
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute(styles, "class")}${spreadAttributes(props)}>
	${renderSlot($$result, $$slots["default"])}
</a>`;
}, "/Users/mark/Projects/Personal/markdejong.org/src/components/HeaderLink.astro");

const $$Astro$7 = createAstro("https://example.com");
const $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description, image = "/placeholder-social.jpg" } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="generator"${addAttribute(Astro2.generator, "content")}>

<!-- Canonical URL -->
<link rel="canonical"${addAttribute(canonicalURL, "href")}>

<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title"${addAttribute(title, "content")}>
<meta name="description"${addAttribute(description, "content")}>

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url"${addAttribute(Astro2.url, "content")}>
<meta property="og:title"${addAttribute(title, "content")}>
<meta property="og:description"${addAttribute(description, "content")}>
<meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}>

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url"${addAttribute(Astro2.url, "content")}>
<meta property="twitter:title"${addAttribute(title, "content")}>
<meta property="twitter:description"${addAttribute(description, "content")}>
<meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}>`;
}, "/Users/mark/Projects/Personal/markdejong.org/src/components/BaseHead.astro");

const $$Astro$6 = createAstro("https://example.com");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`

    
        ${renderComponent($$result, "BaseHead", $$BaseHead, { "description": "Software development", "title": "Vectos", "class": "astro-DMQSI53G" })}
    
    ${maybeRenderHead($$result)}<body class="antialiased font-sans astro-DMQSI53G">

        <!-- This example requires Tailwind CSS v2.0+ -->
        <nav class="bg-white shadow astro-DMQSI53G">
          <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 astro-DMQSI53G">
            <div class="relative flex justify-between h-16 astro-DMQSI53G">
              <div class="absolute inset-y-0 left-0 flex items-center sm:hidden astro-DMQSI53G">
                <!-- Mobile menu button -->
                <button id="nav-button" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 astro-DMQSI53G" aria-controls="mobile-menu" aria-expanded="false">
                  <span class="sr-only astro-DMQSI53G">Open main menu</span>
                  <svg id="menu-icon-closed" class="block h-6 w-6 astro-DMQSI53G" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" class="astro-DMQSI53G"></path>
                  </svg>
                  <svg id="menu-icon-open" class="hidden h-6 w-6 astro-DMQSI53G" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class="astro-DMQSI53G"></path>
                  </svg>
                </button>
              </div>
              <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start astro-DMQSI53G">
                <div class="flex-shrink-0 flex items-center astro-DMQSI53G">
                  <a href="/" class="astro-DMQSI53G"><img class="block lg:hidden h-8 w-auto astro-DMQSI53G" src="/img/logo.png" alt="Vectos"></a>
                  <a href="/" class="astro-DMQSI53G"><img class="hidden lg:block h-8 mt-2 w-auto astro-DMQSI53G" src="/img/logo.png" alt="Vectos"></a>
                </div>
                <div class="hidden sm:ml-6 sm:flex sm:space-x-8 astro-DMQSI53G">
                    ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/", "class": "astro-DMQSI53G" }, { "default": ($$result2) => renderTemplate`Home` })}
                    <!-- <HeaderLink href="/blog">Projects</HeaderLink> -->
                    ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/about", "class": "astro-DMQSI53G" }, { "default": ($$result2) => renderTemplate`About` })}
                    ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/blog", "class": "astro-DMQSI53G" }, { "default": ($$result2) => renderTemplate`Blog` })}
                </div>
              </div>
            </div>
          </div>
    
          <!-- Mobile menu, show/hide based on menu state. -->
          <div id="nav-bar" class="hidden astro-DMQSI53G">
            <div class="pt-2 pb-3 space-y-1 astro-DMQSI53G">
                ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/", "class": "astro-DMQSI53G" }, { "default": ($$result2) => renderTemplate`Home` })}
                <!-- <HeaderLink href="/blog">Projects</HeaderLink> -->
                ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/about", "class": "astro-DMQSI53G" }, { "default": ($$result2) => renderTemplate`About` })}
                ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/blog", "class": "astro-DMQSI53G" }, { "default": ($$result2) => renderTemplate`Blog` })}
            </div>
          </div>
        </nav>
    
        <div class="relative overflow-hidden waves astro-DMQSI53G">
        ${renderSlot($$result, $$slots["default"])}
        </div>
    
      <footer class="bg-white astro-DMQSI53G">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8 astro-DMQSI53G">
          <div class="flex justify-center space-x-6 md:order-2 astro-DMQSI53G">
    
            <a target="_blank" href="https://github.com/vectos" class="text-gray-400 hover:text-gray-500 astro-DMQSI53G">
              <span class="sr-only astro-DMQSI53G">GitHub</span>
              <svg class="h-6 w-6 astro-DMQSI53G" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" class="astro-DMQSI53G"></path>
              </svg>
            </a>
    
            <a href="https://www.linkedin.com/in/mark-de-jong-a808b7167" class="text-gray-400 hover:text-gray-500 astro-DMQSI53G">
              <span class="sr-only astro-DMQSI53G">LinkedIn</span>
              <svg class="h-6 w-6 astro-DMQSI53G" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" class="astro-DMQSI53G"></path>
              </svg>
            </a>
    
          </div>
          <div class="mt-8 md:mt-0 md:order-1 astro-DMQSI53G">
            <p class="text-center text-base text-gray-800 astro-DMQSI53G">
              &copy; 2023 Vectos - The vector in improving your websites & apps. Registered under KvK: 71425993
            </p>
          </div>
        </div>
      </footer>
    
      </body>`;
}, "/Users/mark/Projects/Personal/markdejong.org/src/components/Layout.astro");

const $$Astro$5 = createAstro("https://example.com");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`

	${maybeRenderHead($$result2)}<div class="lg:mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
  
		<main class="lg:relative">
		  <div class="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:text-left">
			<div class="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
			  <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
				<span class="block text-indigo-600 xl:inline">Vectos</span>
				<span class="block xl:inline">the vector in improving your websites & apps</span>
			  </h1>
			  <p class="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
				Vectos creates websites & apps which are
				<span class="text-indigo-600">user friendly</span>, <span class="text-indigo-600">robust</span> and <span class="text-indigo-600">performant</span>.
				Vectos is located in Utrecht in the Netherlands.
			  </p>
			  <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
				<div class="rounded-md shadow">
				  <a href="/projects" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
					Projects
				  </a>
				</div>
				<div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
				  <a href="/about" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
					About
				  </a>
				</div>
			  </div>
			</div>
		  </div>
		  <div class="hidden md:block relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
			<img class="absolute inset-0 w-full h-full" src="/img/hero.svg" alt="">
		  </div>
		</main>


		<div class="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		  <div class="lg:text-center">
			<h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">What do I do?</h2>
			<p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
			  Services
			</p>
			<p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
			  Vectos will help you with your digital experience
			</p>
		  </div>

		  <div class="mt-10">
			<dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">


			  <div class="flex">
				<div class="flex-shrink-0">
				  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
					<!-- Heroicon name: outline/scale -->
					<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
					</svg>
				  </div>
				</div>
				<div class="ml-4">
				  <dt class="text-lg leading-6 font-medium text-gray-900">
					Software development
				  </dt>
				  <dd class="mt-2 text-base text-gray-500">
					Web apps, Desktop apps, Mobile apps, etc. Software development is the process going from a idea to an app.
				  </dd>
				</div>
			  </div>

			  <div class="flex">
				<div class="flex-shrink-0">
				  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
					<!-- Heroicon name: outline/scale -->
					<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
					</svg>
				  </div>
				</div>
				<div class="ml-4">
				  <dt class="text-lg leading-6 font-medium text-gray-900">
					Web development
				  </dt>
				  <dd class="mt-2 text-base text-gray-500">
					Web development is the process of going from an idea to a shiny site!
				  </dd>
				</div>
			  </div>

			  <div class="flex">
				<div class="flex-shrink-0">
				  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
					<!-- Heroicon name: outline/annotation -->
					<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
					</svg>
				  </div>
				</div>
				<div class="ml-4">
				  <dt class="text-lg leading-6 font-medium text-gray-900">
					UX / UI
				  </dt>
				  <dd class="mt-2 text-base text-gray-500">
					User interface (UI) design is the design of user interfaces software, with the focus on maximizing usability also known as User experience (UX).
				  </dd>
				</div>
			  </div>

			  <div class="flex">
				<div class="flex-shrink-0">
				  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
					<!-- Heroicon name: outline/lightning-bolt -->
					<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
					</svg>
				  </div>
				</div>
				<div class="ml-4">
				  <dt class="text-lg leading-6 font-medium text-gray-900">
					Training
				  </dt>
				  <dd class="mt-2 text-base text-gray-500">
					Getting up to speed with Functional Programming, Kubernetes or any of the listed technologies below, shoot me a message!
				  </dd>
				</div>
			  </div>

			</dl>
		  </div>
		</div>


		<div class="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

		  <div class="lg:text-center">
			<p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
			  Clients
			</p>
			<p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
			  I served these clients to be successful in the digital world
			</p>
		  </div>

		  <div class="mt-10">
			<dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">

			  <div class="flex">
				<div class="flex-shrink-0">
				  <div class="flex items-center justify-center h-24 w-24 rounded-md bg-gray-100 text-white">
					<img src="/img/companies/dhl.png">
				  </div>
				</div>
				<div class="ml-4">
				  <dt class="text-lg leading-6 font-medium text-gray-900">
					DHL
				  </dt>
				  <dd class="mt-2 text-base text-gray-500">
					DHL German international courier, package delivery and express mail service. I've worked at DHL on several high-end web applications.
				  </dd>
				</div>
			  </div>

			  <div class="flex">
				<div class="flex-shrink-0">
				  <div class="flex items-center justify-center h-24 w-24 rounded-md bg-gray-100 text-white">
					<img src="/img/companies/ing.png">
				  </div>
				</div>
				<div class="ml-4">
				  <dt class="text-lg leading-6 font-medium text-gray-900">
					ING
				  </dt>
				  <dd class="mt-2 text-base text-gray-500">
					The ING Group is a Dutch multinational banking and financial services corporation. I've worked at ING on approval software.
				  </dd>
				</div>
			  </div>

			  <div class="flex">
				<div class="flex-shrink-0">
				  <div class="flex items-center justify-center h-24 w-24 rounded-md bg-gray-100 text-white">
					<img src="/img/companies/veon.png">
				  </div>
				</div>
				<div class="ml-4">
				  <dt class="text-lg leading-6 font-medium text-gray-900">
					Veon
				  </dt>
				  <dd class="mt-2 text-base text-gray-500">
					VEON is a Dutch-domiciled multinational telecommunication services. It predominantly operates services in the regions of Asia, Africa and Europe. I've worked at VEON on the top up transactional systems.
				  </dd>
				</div>
			  </div>


			  <div class="flex">
				<div class="flex-shrink-0">
				  <div class="flex items-center justify-center h-24 w-24 rounded-md bg-gray-100 text-white">
					<img src="/img/companies/malmberg.svg">
				  </div>
				</div>
				<div class="ml-4">
				  <dt class="text-lg leading-6 font-medium text-gray-900">
					Malmberg
				  </dt>
				  <dd class="mt-2 text-base text-gray-500">
					Malmberg is a Dutch company which creates educational software and books for schools. I've worked on Malmberg on a content management system (CMS) for eductional software.
				  </dd>
				</div>
			  </div>

			</dl>
		  </div>
		</div>

		<div class="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

		  <div class="lg:text-center">
			<p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
			  Certified
			</p>
			<p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
			  Driven to keep up with latest trends and technologies
			</p>
		  </div>

		  <div class="mt-8">
			<dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">

			  <div class="flex">
				<div class="flex-shrink-0">
				  <div class="flex items-center justify-center h-24 w-24 rounded-md bg-gray-100 text-white">
					<img src="/img/cert/nielsen-norman.png">
				  </div>
				</div>
				<div class="ml-4">
				  <dt class="text-lg leading-6 font-medium text-gray-900">
					Nielsen Norman / Interaction design
				  </dt>
				  <dd class="mt-2 text-base text-gray-500">
					Nielsen Norman Group, an elite firm dedicated to improving the everyday experience of using technology. I took courses on interaction design with the focus on apps.
				  </dd>
				</div>
			  </div>

			  <div class="flex">
				<div class="flex-shrink-0">
				  <div class="flex items-center justify-center h-24 w-24 rounded-md bg-gray-100 text-white">
					<img src="/img/cert/coursera.png">
				  </div>
				</div>
				<div class="ml-4">
				  <dt class="text-lg leading-6 font-medium text-gray-900">
					Machine Learning by Andrew Ng
				  </dt>
				  <dd class="mt-2 text-base text-gray-500">
					Machine learning is the science of getting computers to act without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, speech recognition, web search, etc.
				  </dd>
				</div>
			  </div>

			  <div class="flex">
				<div class="flex-shrink-0">
				  <div class="flex items-center justify-center h-24 w-24 rounded-md bg-gray-100 text-white">
					<img src="/img/cert/ckad.png">
				  </div>
				</div>
				<div class="ml-4">
				  <dt class="text-lg leading-6 font-medium text-gray-900">
					CKAD - Certified Kubernetes Application Developer
				  </dt>
				  <dd class="mt-2 text-base text-gray-500">
					Be able to define application resources and use core primitives to build, monitor, and troubleshoot scalable applications and tools in Kubernetes.
				  </dd>
				</div>
			  </div>

			</dl>
		  </div>
		</div>


		<div class="mt-8 bg-white">
		  <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
			<div class="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
			  <div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
				<div class="lg:self-center">
				  <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
					<span class="block">Kopje koffie?</span>
				  </h2>
				  <p class="mt-4 text-lg leading-6 text-indigo-200">How could I help with your business? Let's have a coffee in real life or online!</p>

				  <a href="mailto:mark@vectos.net" class="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50">Contact Mark</a>
				  <a href="/about" class="mt-8 border border-transparent underline px-5 py-3 inline-flex items-center text-base font-medium text-gray-200 hover:bg-white-50">About Mark</a>
				</div>
			  </div>
			  <div class="mt-6 mb-6 mr-6">
				<img class="h-128 w-128 rounded-lg" src="/img/mark.jpg" alt="Mark">
			  </div>
			</div>
		  </div>
		</div>


	  </div>
  
  
` })}`;
}, "/Users/mark/Projects/Personal/markdejong.org/src/pages/index.astro");

const $$file$3 = "/Users/mark/Projects/Personal/markdejong.org/src/pages/index.astro";
const $$url$3 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

// astro-head-inject

const contentDir = '/src/content/';

const entryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/a-functional-ecosystem.md": () => import('../a-functional-ecosystem.f6d2b724.mjs'),"/src/content/blog/baremetalrust-esp32.md": () => import('../baremetalrust-esp32.e3701026.mjs'),"/src/content/blog/machine_learning.md": () => import('../machine_learning.8efa7b6e.mjs'),"/src/content/blog/oracle-testing.md": () => import('../oracle-testing.2f24ef3e.mjs'),"/src/content/blog/saga.md": () => import('../saga.c27473ce.mjs'),"/src/content/blog/teevy.md": () => import('../teevy.5a876bab.mjs'),"/src/content/blog/telegram-bot-in-functional-scala.md": () => import('../telegram-bot-in-functional-scala.94da263b.mjs'),"/src/content/blog/tracing.md": () => import('../tracing.b39f7135.mjs')

});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: entryGlob,
	contentDir,
});

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/a-functional-ecosystem.md": () => import('../a-functional-ecosystem.cf5d4fb9.mjs'),"/src/content/blog/baremetalrust-esp32.md": () => import('../baremetalrust-esp32.ba458e4f.mjs'),"/src/content/blog/machine_learning.md": () => import('../machine_learning.1731affa.mjs'),"/src/content/blog/oracle-testing.md": () => import('../oracle-testing.75b785e7.mjs'),"/src/content/blog/saga.md": () => import('../saga.67512290.mjs'),"/src/content/blog/teevy.md": () => import('../teevy.ac9066f1.mjs'),"/src/content/blog/telegram-bot-in-functional-scala.md": () => import('../telegram-bot-in-functional-scala.e2693665.mjs'),"/src/content/blog/tracing.md": () => import('../tracing.67baa13d.mjs')

});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	collectionToEntryMap,
	collectionToRenderEntryMap,
});

const SITE_TITLE = "My personal website.";
const SITE_DESCRIPTION = "Welcome to my website!";

async function get(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  get
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro("https://example.com");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<div class="mt-4 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div class="overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
      <div class="pt-12 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
        <div class="lg:self-center">
          <h2 class="text-3xl font-extrabold text-black sm:text-4xl">
            <span class="block">Mark de Jong</span>
          </h2>

          <ul class="mt-4 flex space-x-5">
            <li>
              <a target="_blank" href="https://github.com/vectos" class="text-gray-500 hover:text-black">
                <span class="sr-only">GitHub</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.linkedin.com/in/mark-de-jong-a808b7167" class="text-gray-500 hover:text-black">
                <span class="sr-only">LinkedIn</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </li>
          </ul>

          <div class="mt-4 mb-4 text-sm text-gray-800">
            <p class="mt-4 leading-6">Writes robust & performant software, designs user friendly interfaces, asks questions, mentors and reviews code. I do this under the banner Vectos, which is spanish for Vector which means magnitude and direction.</p>

            <p class="mt-4 leading-6">In my professional career I have worked at various companies doing diverse projects.</p>

            <ul class="mt-4 leading-6 list-disc list-inside">
                <li>Development of custom content management systems</li>
                <li>Development and moderation of community websites</li>
                <li>Improving performance of existing software</li>
                <li>High performance backends</li>
                <li>Financial systems</li>
                <li>Marketing pages</li>
                <li>Single page web apps and mobile apps.</li>
            </ul>

          </div>
          <a href="mailto:mark@vectos.net" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
            Contact Mark
          </a>
        </div>

      </div>
      <div class="mt-6 mr-6">
        <img class="h-128 w-128 rounded-lg" src="/img/mark.jpg" alt="Mark">
      </div>
    </div>
  </div>

` })}`;
}, "/Users/mark/Projects/Personal/markdejong.org/src/pages/about.astro");

const $$file$2 = "/Users/mark/Projects/Personal/markdejong.org/src/pages/about.astro";
const $$url$2 = "/about";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("https://example.com");
const $$FormattedDate = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<time${addAttribute(date.toISOString(), "datetime")}>
	${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })}
</time>`;
}, "/Users/mark/Projects/Personal/markdejong.org/src/components/FormattedDate.astro");

const $$Astro$2 = createAstro("https://example.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = (await getCollection("blog")).sort(
    (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
  ).reverse();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<div class="bg-white py-12 sm:py-12">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
          Latest rumblings around tech
        </p>
      </div>
      <div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
		${posts.map(
    (post) => renderTemplate`<article class="relative w-[400px] isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 ml-6 mb-10">
              <img${addAttribute(post.data.banner, "src")} alt="" class="absolute inset-0 -z-10 h-full w-full object-cover">
              <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

              <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <time class="mr-8">
					${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": post.data.pubDate })}
                </time>
                <div class="-ml-4 flex items-center gap-x-4">
                  <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                    <circle${addAttribute(1, "cx")}${addAttribute(1, "cy")}${addAttribute(1, "r")}></circle>
                  </svg>
                  <div class="flex gap-x-2.5">
                    <img src="/img/mark_avatar.jpg" alt="" class="h-6 w-6 flex-none rounded-full bg-white/10">
                    Mark
                  </div>
                </div>
              </div>
              <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
                <a${addAttribute(`/blog/${post.slug}`, "href")}>
                  <span class="absolute inset-0"></span>
                  ${post.data.title}
                </a>
              </h3>
            </article>`
  )}
        </div>
      </div>
    </div>
` })}`;
}, "/Users/mark/Projects/Personal/markdejong.org/src/pages/blog/index.astro");

const $$file$1 = "/Users/mark/Projects/Personal/markdejong.org/src/pages/blog/index.astro";
const $$url$1 = "/blog";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://example.com");
const $$BlogPost = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, description, pubDate } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<div class="relative bg-gray-50 overflow-hidden">
		<div class="mt-8 mb-8 relative px-4 sm:px-6 lg:px-8">
		  <div class="text-lg max-w-prose mx-auto">
			<h1>
			  <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": pubDate })}</span>
			  <span class="mt-2 block text-2xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-3xl">${title}</span>
			</h1>
			<p class="mt-8 text-xl text-gray-500 leading-8">${description}</p>
		  </div>
		  <div class="mt-6 prose prose-stone prose-indigo prose-base text-gray-500 mx-auto">
			${renderSlot($$result2, $$slots["default"])}
		  </div>
	
		  
		</div>
	  </div>	
` })}`;
}, "/Users/mark/Projects/Personal/markdejong.org/src/layouts/BlogPost.astro");

const $$Astro = createAstro("https://example.com");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const post = Astro2.props;
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { ...post.data }, { "default": ($$result2) => renderTemplate`
	${renderComponent($$result2, "Content", Content, {})}
` })}`;
}, "/Users/mark/Projects/Personal/markdejong.org/src/pages/blog/[...slug].astro");

const $$file = "/Users/mark/Projects/Personal/markdejong.org/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, _page2 as b, _page3 as c, _page4 as d };
