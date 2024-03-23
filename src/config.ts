import { Decoder, exact, oneOf, string } from "decoders";

type Config = {
  ENVIRONMENT: "development" | "production";
  WEB_APP: {
    BROWSER_EXTENSION_PATH: string;
    ORIGIN: string;
  };
};

const configDecoder: Decoder<Config> = exact({
  ENVIRONMENT: oneOf(["development", "production"]),
  WEB_APP: exact({
    BROWSER_EXTENSION_PATH: string,
    ORIGIN: string,
  }),
});

const IS_PRODUCTION = process.env.BUILD_ENV === "production";

const config = {
  ENVIRONMENT: IS_PRODUCTION ? "production" : "development",
  WEB_APP: {
    BROWSER_EXTENSION_PATH: "/browser-extension",
    ORIGIN: IS_PRODUCTION
      ? "https://tinyrecipebox.com"
      : "http://localhost:3000",
  },
};

export default configDecoder.verify(config);
