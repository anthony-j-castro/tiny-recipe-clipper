import {
  Decoder,
  exact,
  nonEmptyString,
  nullable,
  oneOf,
  string,
} from "decoders";
import packageJson from "~/../package.json";

type Config = {
  ENVIRONMENT: "development" | "production";
  REPORT_PROBLEM_FORM: {
    URL: string;
    VERSION_LINK_PARAM: string;
    WEBSITE_LINK_PARAM: string;
  };
  REQUEST_FORM: {
    URL: string;
    WEBSITE_LINK_PARAM: string;
  };
  ROLLBAR_ACCESS_TOKEN: string | null;
  VERSION: string;
  WEB_APP: {
    BROWSER_EXTENSION_PATH: string;
    IMPORT_RECIPE_PATH: string;
    ORIGIN: string;
    SETTINGS_PATH: string;
  };
};

const configDecoder: Decoder<Config> = exact({
  ENVIRONMENT: oneOf(["development", "production"]),
  REPORT_PROBLEM_FORM: exact({
    URL: string,
    VERSION_LINK_PARAM: string,
    WEBSITE_LINK_PARAM: string,
  }),
  REQUEST_FORM: exact({
    URL: string,
    WEBSITE_LINK_PARAM: string,
  }),
  ROLLBAR_ACCESS_TOKEN: nullable(nonEmptyString),
  VERSION: string,
  WEB_APP: exact({
    BROWSER_EXTENSION_PATH: string,
    IMPORT_RECIPE_PATH: string,
    ORIGIN: string,
    SETTINGS_PATH: string,
  }),
});

const IS_PRODUCTION = process.env.BUILD_ENV === "production";

const config: Config = {
  ENVIRONMENT: IS_PRODUCTION ? "production" : "development",
  REPORT_PROBLEM_FORM: {
    URL: "https://docs.google.com/forms/d/e/1FAIpQLSeV1bF-mkxoBibHnxKk4AjeVLI8fUjLLRj08Z9nW7vch1qnPg/viewform",
    VERSION_LINK_PARAM: "entry.307864289",
    WEBSITE_LINK_PARAM: "entry.1161392725",
  },
  REQUEST_FORM: {
    URL: "https://docs.google.com/forms/d/e/1FAIpQLSfxOzZQMDKmz8uCvlUskaiZdH6JO9nhc3eWNo59YSgtOqlTHw/viewform",
    WEBSITE_LINK_PARAM: "entry.895703910",
  },
  ROLLBAR_ACCESS_TOKEN: process.env.ROLLBAR_ACCESS_TOKEN || null,
  VERSION: packageJson.version,
  WEB_APP: {
    BROWSER_EXTENSION_PATH: "/browser-extension",
    IMPORT_RECIPE_PATH: "/import-recipe",
    ORIGIN: IS_PRODUCTION
      ? "https://tinyrecipebox.com"
      : "http://localhost:3000",
    SETTINGS_PATH: "/settings",
  },
};

export default configDecoder.verify(config);
