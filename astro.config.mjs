import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://vectos.net",
  integrations: [tailwind(), react()],
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: false,
    },
  },
  output: "server",
  adapter: netlify(),
});
