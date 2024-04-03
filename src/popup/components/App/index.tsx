import { sendMessageToTab } from "~/chrome-helpers";
import config from "~/config";
import useGetCurrentTab from "~/hooks/useGetCurrentTab";
import useGetMe from "~/hooks/useGetUserId";
import IconNav from "~/popup/components/IconNav";
import useFlavorText from "~/popup/hooks/useFlavorText";
import useGetRecipeTitle from "~/popup/hooks/useGetRecipeTitle";
import isRecipePage from "~/utils/isRecipePage";
import isSupportedWebsite from "~/utils/isSupportedWebsite";
import {
  ActionButton,
  AppContainer,
  Card,
  ClipRecipeButton,
  FlavorText,
  PrimaryActionButton,
  RecipeTitle,
  Text,
  TopRow,
} from "./styled";

const App = () => {
  const { data: userId, isPending } = useGetMe();
  const { data: currentTab } = useGetCurrentTab();

  const isRequiresSync = userId === undefined;

  const isSupported = currentTab?.url
    ? isSupportedWebsite(currentTab.url)
    : false;
  const isRecipeOnPage = currentTab?.url ? isRecipePage(currentTab.url) : false;

  const requestFormUrl = new URL(config.REQUEST_FORM.URL);
  if (currentTab?.url) {
    requestFormUrl.searchParams.set(
      config.REQUEST_FORM.WEBSITE_LINK_PARAM,
      currentTab.url,
    );
  }

  const { data: recipeTitle } = useGetRecipeTitle({ enabled: isRecipeOnPage });

  const flavorText = useFlavorText();

  return (
    <AppContainer>
      <TopRow>
        <IconNav />
        {!isRequiresSync && isSupported ? (
          <ClipRecipeButton
            disabled={!isRecipeOnPage}
            onClick={() => {
              if (currentTab?.id) {
                sendMessageToTab(currentTab.id, {
                  type: "EXTRACT_RECIPE",
                  sender: "popup",
                  payload: {
                    destination: "service-worker",
                  },
                });
              }
            }}
            accessibleWhenDisabled
          >
            Clip recipe
          </ClipRecipeButton>
        ) : null}
      </TopRow>
      {isPending ? null : isRequiresSync ? (
        <Card>
          <Text>
            Finish setting up this extension by syncing with the web app.
          </Text>
          <PrimaryActionButton
            href={`${config.WEB_APP.ORIGIN}${config.WEB_APP.BROWSER_EXTENSION_PATH}`}
          >
            Launch Tiny Recipe Box in a new tab
          </PrimaryActionButton>
        </Card>
      ) : isRecipeOnPage ? (
        <Card $emphasize>
          <RecipeTitle>{recipeTitle}</RecipeTitle>
          <FlavorText>{flavorText}</FlavorText>
        </Card>
      ) : isSupported ? (
        <Card>
          <Text>To clip a recipe, make sure you’re on a recipe page.</Text>
        </Card>
      ) : (
        <Card>
          <Text>
            Sorry! It looks like we don’t support clipping recipes from this
            site.
          </Text>
          <ActionButton href={requestFormUrl.toString()}>
            Request support for this site
          </ActionButton>
        </Card>
      )}
    </AppContainer>
  );
};
export default App;
