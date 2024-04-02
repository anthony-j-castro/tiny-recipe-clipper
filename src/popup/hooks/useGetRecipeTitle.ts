import { useQuery } from "@tanstack/react-query";
import { getCurrentTab, sendMessageToTab } from "~/chrome-helpers";
import { recipeDataMessageDecoder } from "~/messages/decoders";

const useGetRecipeTitle = () =>
  useQuery({
    queryKey: ["getRecipeTitle"],
    queryFn: async () => {
      const currentTab = await getCurrentTab();

      if (currentTab.id) {
        const response = await sendMessageToTab(currentTab.id, {
          type: "EXTRACT_RECIPE",
          sender: "popup",
          payload: {
            destination: "popup",
          },
        });

        const decodedResponse = recipeDataMessageDecoder.verify(response);

        return decodedResponse.payload.recipe.title;
      }
    },
  });

export default useGetRecipeTitle;
