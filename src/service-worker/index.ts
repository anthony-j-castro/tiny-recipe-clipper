import config from "~/config";
import { receivableServiceWorkerMessageDecoder } from "~/messages/decoders";
import { setUserId } from "~/storage";

const WEB_APP_URL = new URL(config.WEB_APP.ORIGIN);

chrome.runtime.onMessageExternal.addListener(
  (rawMessage, sender, sendResponse) => {
    try {
      console.log("MESSAGE", rawMessage);

      if (sender.origin !== WEB_APP_URL.origin) {
        throw new Error("Unknown sender origin.");
      }

      const message = receivableServiceWorkerMessageDecoder.verify(rawMessage);

      switch (message.type) {
        case "PING": {
          setUserId(message.payload.userId);
          // TODO: Reset user ID query in popup by
          // sending a message to popup?

          sendResponse({
            type: "PONG",
            extensionVersion: config.VERSION,
          });
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
);
