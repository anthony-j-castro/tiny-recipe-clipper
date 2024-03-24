import { Decoder, exact, oneOf, string } from "decoders";

type Config = {
  ENVIRONMENT: "development" | "production";
  REPORT_PROBLEM_FORM: {
    URL: string;
    VERSION_LINK_PARAM: string;
    WEBSITE_LINK_PARAM: string;
  };
  WEB_APP: {
    BROWSER_EXTENSION_PATH: string;
    ORIGIN: string;
  };
};

const configDecoder: Decoder<Config> = exact({
  ENVIRONMENT: oneOf(["development", "production"]),
  REPORT_PROBLEM_FORM: exact({
    URL: string,
    VERSION_LINK_PARAM: string,
    WEBSITE_LINK_PARAM: string,
  }),
  WEB_APP: exact({
    BROWSER_EXTENSION_PATH: string,
    ORIGIN: string,
  }),
});

const IS_PRODUCTION = process.env.BUILD_ENV === "production";

const config = {
  ENVIRONMENT: IS_PRODUCTION ? "production" : "development",
  REPORT_PROBLEM_FORM: {
    URL: "https://docs.google.com/forms/d/e/1FAIpQLSeV1bF-mkxoBibHnxKk4AjeVLI8fUjLLRj08Z9nW7vch1qnPg/viewform",
    VERSION_LINK_PARAM: "entry.307864289",
    WEBSITE_LINK_PARAM: "entry.1161392725",
  },
  WEB_APP: {
    BROWSER_EXTENSION_PATH: "/browser-extension",
    ORIGIN: IS_PRODUCTION
      ? "https://tinyrecipebox.com"
      : "http://localhost:3000",
  },
};

export default configDecoder.verify(config);
