import config from "~/config";
import { SUPPORTED_HOSTNAMES_DATA } from "~/constants";

const recipeWebsitesMatchesArray = Object.entries(SUPPORTED_HOSTNAMES_DATA).map(
  ([hostname]) => `https://${hostname}/*`,
);

const baseManifest = {
  name: "Tiny Recipe Clipper",
  description: "Clip recipes from your favorite websites.",
  // The real version will be copied over automatically
  // from package.json. A placeholder is used here to maintain
  // the position of the version key in the file.
  version: "x.x.x",
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
    matches: [`http://${config.WEB_APP.HOSTNAME}/*`],
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