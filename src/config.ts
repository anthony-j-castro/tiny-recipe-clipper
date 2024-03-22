import { Decoder, exact, oneOf, string } from "decoders";

type Config = {
  ENVIRONMENT: "development" | "production";
  WEB_APP: {
    HOME_URL: string;
    HOSTNAME: string;
  };
};

const configDecoder: Decoder<Config> = exact({
  ENVIRONMENT: oneOf(["development", "production"]),
  WEB_APP: exact({
    HOME_URL: string,
    HOSTNAME: string,
  }),
});

const IS_PRODUCTION = process.env.BUILD_ENV === "production";

const config = {
  ENVIRONMENT: IS_PRODUCTION ? "production" : "development",
  WEB_APP: {
    HOME_URL: "https://tinyrecipebox.com/",
    HOSTNAME: IS_PRODUCTION ? "tinyrecipebox.com" : "localhost:3000",
  },
};

export default configDecoder.verify(config);
