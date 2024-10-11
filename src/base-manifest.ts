import config from "~/config";
import { SUPPORTED_HOSTNAMES_DATA } from "~/constants";

const recipeWebsitesMatchesArray = Object.entries(SUPPORTED_HOSTNAMES_DATA).map(
  ([hostname]) => `https://${hostname}/*`,
);

const baseManifest: chrome.runtime.ManifestV3 = {
  name: "Tiny Recipe Clipper",
  description: "Clip recipes from your favorite websites.",
  key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg7YR6fSyLKY2/5U9OyK0djEKQpViaNRV7+Gcc2kgoSAgUHqi50lVe4PdB87UMVKS4s3r78UjfySP0UPl8vZjKrCfnWdrTOt8Bhvi3EXcYfmjUYhzBDI8kMjWv506g31ZPvbTneH4VUfl2sg6DwpJHtih0OYcQcm+ehbBApBPT2pthwqqvWNTscnokWn315XDGakQd050+MRbipELibJwNY3B2sMEwZtmM44ZWwroPK8kfgfAEMa7AbMIfzqeFucKPZAtpKxj/ATgkb6j+vecw7WbzMxv4YvMkO5zFITPRve3827+LGxpR/j8dUmGlcJaPz1VFYmMp53M3L+BJdfWhQIDAQAB",
  // The real version will be copied over automatically
  // from package.json. A placeholder is used here to maintain
  // the position of the version key in the file.
  version: "x.x.x",
  // This is also a placeholder. This key will be deleted if
  // if it's a production build.
  version_name: "x.x.x-xxxxxx",
  manifest_version: 3,
  action: {
    default_icon: "images/inactive-icon.png",
    default_popup: "popup.html",
  },
  background: {
    service_worker: "service-worker.js",
  },
  content_scripts: [
    {
      matches: recipeWebsitesMatchesArray,
      js: ["recipe-scraper.js"],
    },
  ],
  externally_connectable: {
    matches: [
      `${config.WEB_APP.ORIGIN}/*`,
      "http://localhost:3000/*",
      ...(config.ENVIRONMENT === "test" ? recipeWebsitesMatchesArray : []),
    ],
  },
  options_ui: {
    page: "options.html",
    open_in_tab: true,
  },
  icons: {
    "48": "images/icon48.png",
    "128": "images/icon128.png",
  },
  permissions: ["activeTab", "storage", "tabs"],
};

export default baseManifest;
