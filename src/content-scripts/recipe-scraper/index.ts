import { sendMessageToServiceWorker } from "~/chrome-helpers";
import instantiateScraper from "~/content-scripts/recipe-scraper/utils/instantiateScraper";
import { ImpossibleStateError } from "~/errors";
import { receivableRecipeScraperMessageDecoder } from "~/messages/decoders";
import type { SendResponseFn } from "~/messages/types";
import isRecipePage from "~/utils/isRecipePage";
import isSupportedWebsite from "~/utils/isSupportedWebsite";

chrome.runtime.onMessage.addListener(
  (rawMessage, sender, sendResponse: SendResponseFn) => {
    // We currently only care about messages from the popup UI. If a tab exists,
    // that means this message is from a content script.
    if (sender.tab) {
      return;
    }

    const message = receivableRecipeScraperMessageDecoder.value(rawMessage);

    switch (message?.type) {
      case "EXTRACT_RECIPE": {
        if (
          isSupportedWebsite(window.location.href) &&
          isRecipePage(window.location.href)
        ) {
          const getAndSendRecipe = async () => {
            const scraper = instantiateScraper(window.location.href);

            if (scraper === undefined) {
              throw new ImpossibleStateError(
                "A scraper could not be instantiated for a valid recipe page.",
              );
            }

            try {
              const { recipe } = await scraper.load();

              // Check alerts and send info message to rollbar

              switch (message.payload.destination) {
                case "popup": {
                  sendResponse({
                    type: "RECIPE_DATA",
                    sender: "recipe-scraper",
                    payload: {
                      recipe,
                    },
                  });

                  break;
                }

                case "service-worker": {
                  sendMessageToServiceWorker({
                    type: "SEND_RECIPE_DATA",
                    sender: "recipe-scraper",
                    payload: {
                      recipe,
                    },
                  });

                  break;
                }
              }
            } catch (error) {
              sendResponse({
                type: "ERROR",
                sender: "recipe-scraper",
                payload: {
                  error: "The recipe could not be extracted properly.",
                },
              });
            }
          };

          // Because we are performing an asynchronous action,
          // we need to return true in order to use sendResponse asynchronously.
          // See: https://developer.chrome.com/docs/extensions/develop/concepts/messaging#simple
          getAndSendRecipe();

          return true;
        }

        sendResponse({
          type: "ERROR",
          sender: "recipe-scraper",
          payload: {
            error:
              "A recipe cannot be extracted because this is not a valid recipe page.",
          },
        });

        return;
      }
    }
  },
);
