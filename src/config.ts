import { Decoder, object, string } from "decoders";

type Config = {
  WEB_APP: {
    HOME_URL: string;
    HOSTNAME: string;
  };
};

const configDecoder: Decoder<Config> = object({
  WEB_APP: object({
    HOME_URL: string,
    HOSTNAME: string,
  }),
});

const config = {
  WEB_APP: {
    HOME_URL: "https://tinyrecipebox.com/",
    HOSTNAME: "localhost:3000",
  },
};

export default configDecoder.verify(config);
