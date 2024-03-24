import config from "~/config";
import { receivableServiceWorkerMessageDecoder } from "~/messages/decoders";
import { setUserId } from "~/storage";

const WEB_APP_URL = new URL(config.WEB_APP.ORIGIN);

chrome.runtime.onMessageExternal.addListener(
  (rawMessage, sender, sendResponse) => {
    try {
      if (sender.origin !== WEB_APP_URL.origin) {
        throw new Error("Unknown sender origin.");
      }

      const message = receivableServiceWorkerMessageDecoder.verify(rawMessage);

      switch (message.type) {
        case "PING": {
          setUserId(message.payload.userId);

          sendResponse({
            type: "PONG",
            extensionVersion: config.VERSION,
          });
          break;
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  },
);
