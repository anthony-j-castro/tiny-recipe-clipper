import { sendMessageToTab } from "~/chrome-helpers";
import config from "~/config";
import useGetCurrentTab from "~/hooks/useGetCurrentTab";
import useGetMe from "~/hooks/useGetUserId";
import IconNav from "~/popup/components/IconNav";
import useFlavorText from "~/popup/hooks/useFlavorText";
import useGetRecipeTitle from "~/popup/hooks/useGetRecipeTitle";
import getReportProblemFormUrl from "~/utils/getReportProblemFormUrl";
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
  const { data: userId, isPending: isPendingMe } = useGetMe();
  const { data: currentTab } = useGetCurrentTab();

  const isRequiresSync = userId === undefined;

  const isSupported = currentTab?.url
    ? isSupportedWebsite(currentTab.url)
    : false;
  const isRecipeOnPage = currentTab?.url ? isRecipePage(currentTab.url) : false;

  const reportProblemFormUrl = getReportProblemFormUrl(currentTab?.url);

  const requestFormUrl = new URL(config.REQUEST_FORM.URL);
  if (currentTab?.url) {
    requestFormUrl.searchParams.set(
      config.REQUEST_FORM.WEBSITE_LINK_PARAM,
      currentTab.url,
    );
  }

  const {
    data: recipeTitle,
    isError: isErrorRecipeTitle,
    isPending: isPendingRecipeTitle,
  } = useGetRecipeTitle({
    enabled: isRecipeOnPage,
  });

  const flavorText = useFlavorText();

  return (
    <AppContainer>
      <TopRow>
        <IconNav />
        {!isRequiresSync && isSupported ? (
          <ClipRecipeButton
            isDisabled={!isRecipeOnPage || isErrorRecipeTitle}
            onPress={() => {
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
          >
            Clip recipe
          </ClipRecipeButton>
        ) : null}
      </TopRow>
      {isPendingMe ? null : isRequiresSync ? (
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
        isPendingRecipeTitle ? null : isErrorRecipeTitle ? (
          <Card>
            <Text>
              Sorry! You’re on a valid recipe page but the recipe couldn’t be
              read properly.
            </Text>
            <ActionButton href={reportProblemFormUrl}>
              Report a problem
            </ActionButton>
          </Card>
        ) : (
          <Card $emphasize>
            <RecipeTitle data-testid="recipe-title">{recipeTitle}</RecipeTitle>
            <FlavorText>{flavorText}</FlavorText>
          </Card>
        )
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
