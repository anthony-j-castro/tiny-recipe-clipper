import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json" with { type: "json" };
import { SUPPORTED_HOSTNAMES_DATA } from "./src/constants.ts";

// Manually switch this to "http://localhost:3000" when developing tinyrecipebox.com locally.
const WEB_APP_ORIGIN = "https://tinyrecipebox.com";

const VERSION_NAME =
  process.env.GITHUB_SHA && process.env.PUBLISH !== "true"
    ? `${pkg.version}-${process.env.GITHUB_SHA.slice(0, 7)}`
    : undefined;

const recipeWebsitesMatchesArray = Object.entries(SUPPORTED_HOSTNAMES_DATA).map(
  ([hostname]) => `https://${hostname}/*`,
);

export default defineManifest({
  manifest_version: 3,
  name: "Tiny Recipe Clipper",
  description: "Clip recipes from your favorite websites.",
  // TODO: Update production key with real value after initial publish.
  key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg7YR6fSyLKY2/5U9OyK0djEKQpViaNRV7+Gcc2kgoSAgUHqi50lVe4PdB87UMVKS4s3r78UjfySP0UPl8vZjKrCfnWdrTOt8Bhvi3EXcYfmjUYhzBDI8kMjWv506g31ZPvbTneH4VUfl2sg6DwpJHtih0OYcQcm+ehbBApBPT2pthwqqvWNTscnokWn315XDGakQd050+MRbipELibJwNY3B2sMEwZtmM44ZWwroPK8kfgfAEMa7AbMIfzqeFucKPZAtpKxj/ATgkb6j+vecw7WbzMxv4YvMkO5zFITPRve3827+LGxpR/j8dUmGlcJaPz1VFYmMp53M3L+BJdfWhQIDAQAB",
  version: pkg.version,
  version_name: VERSION_NAME,
  icons: {
    48: "icons/icon48.png",
    128: "icons/icon128.png",
  },
  action: {
    default_icon: "icons/inactive-icon.png",
    default_popup: "src/popup/index.html",
  },
  permissions: ["activeTab", "storage", "tabs"],
  background: {
    service_worker: "src/service-worker/service-worker.ts",
  },
  content_scripts: [
    {
      matches: recipeWebsitesMatchesArray,
      js: ["src/content-scripts/recipe-scraper/recipe-scraper.ts"],
    },
  ],
  options_ui: {
    page: "src/options/index.html",
    open_in_tab: true,
  },
  externally_connectable: {
    matches: [`${WEB_APP_ORIGIN}/*`],
  },
});
