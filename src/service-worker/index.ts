import { createEmptyTab, setTabUrl } from "~/chrome-helpers";
import config from "~/config";
import { receivableServiceWorkerMessageDecoder } from "~/messages/decoders";
import { Message } from "~/messages/types";
import { setUserId } from "~/storage";

const WEB_APP_URL = new URL(config.WEB_APP.ORIGIN);

chrome.runtime.onMessage.addListener(async (rawMessage) => {
  try {
    const message = receivableServiceWorkerMessageDecoder.verify(rawMessage);

    switch (message.type) {
      case "SEND_RECIPE_DATA": {
        const tab = await createEmptyTab();

        const newTabListener = (
          newTabRawMessage: unknown,
          newTabSender: chrome.runtime.MessageSender,
          sendResponse: (message: Message) => void,
        ) => {
          const message =
            receivableServiceWorkerMessageDecoder.value(newTabRawMessage);

          if (
            message !== undefined &&
            message.type === "RECIPE_IMPORTER_READY" &&
            tab.id !== undefined &&
            newTabSender.tab?.id === tab.id
          ) {
            sendResponse({
              type: "RECIPE_DATA",
              sender: "service-worker",
            });

            chrome.runtime.onMessageExternal.removeListener(newTabListener);
          }
        };

        if (tab.id) {
          chrome.runtime.onMessageExternal.addListener(newTabListener);

          setTabUrl(
            tab.id,
            `${config.WEB_APP.ORIGIN}${config.WEB_APP.IMPORT_RECIPE_PATH}`,
          );
        }

        break;
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

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
