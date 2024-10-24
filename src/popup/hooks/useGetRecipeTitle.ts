import { useQuery } from "@tanstack/react-query";
import { either } from "decoders";
import { getCurrentTab, sendMessageToTab } from "~/chrome-helpers";
import {
  errorMessageDecoder,
  recipeDataMessageDecoder,
} from "~/messages/decoders";

const useGetRecipeTitle = ({ enabled }: { enabled?: boolean } = {}) =>
  useQuery({
    enabled,
    queryKey: ["getRecipeTitle"],
    queryFn: async () => {
      try {
        const currentTab = await getCurrentTab();

        if (currentTab?.id) {
          const response = await sendMessageToTab(currentTab.id, {
            type: "EXTRACT_RECIPE",
            sender: "popup",
            payload: {
              destination: "popup",
            },
          });

          const decodedResponse = either(
            recipeDataMessageDecoder,
            errorMessageDecoder,
          ).verify(response);

          if (decodedResponse.type === "ERROR") {
            throw new Error(decodedResponse.payload.error);
          }

          return decodedResponse.payload.recipe.title;
        }
      } catch {
        throw new Error(
          "An unexpected error occurred while extracting the recipe title.",
        );
      }
    },
  });

export default useGetRecipeTitle;
