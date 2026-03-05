import clsx from "clsx";
import { sendMessageToTab } from "~/chrome-helpers";
import config from "~/config";
import useGetCurrentTab from "~/hooks/useGetCurrentTab";
import useGetMe from "~/hooks/useGetUserId";
import IconNav from "~/popup/components/IconNav";
import LinkButton from "~/popup/components/LinkButton";
import useFlavorText from "~/popup/hooks/useFlavorText";
import useGetRecipeTitle from "~/popup/hooks/useGetRecipeTitle";
import LinkPrimaryButton from "~/ui-shared/components/LinkPrimaryButton";
import PrimaryButton from "~/ui-shared/components/PrimaryButton";
import getReportProblemFormUrl from "~/utils/getReportProblemFormUrl";
import isRecipePage from "~/utils/isRecipePage";
import isSupportedWebsite from "~/utils/isSupportedWebsite";
import styles from "./style.module.css";

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
    <div className={styles.container}>
      <div className={styles.topRow}>
        <IconNav />
        {!isRequiresSync && isSupported ? (
          <PrimaryButton
            className={styles.clipRecipeButton}
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
          </PrimaryButton>
        ) : null}
      </div>
      {isPendingMe ? null : isRequiresSync ? (
        <div className={styles.card}>
          <div className={styles.text}>
            Finish setting up this extension by syncing with the web app.
          </div>
          <LinkPrimaryButton
            className={styles.actionButton}
            href={`${config.WEB_APP.ORIGIN}${config.WEB_APP.BROWSER_EXTENSION_PATH}`}
          >
            Launch Tiny Recipe Box in a new tab
          </LinkPrimaryButton>
        </div>
      ) : isRecipeOnPage ? (
        isPendingRecipeTitle ? null : isErrorRecipeTitle ? (
          <div className={styles.card}>
            <div className={styles.text}>
              Sorry! You’re on a valid recipe page but the recipe couldn’t be
              read properly.
            </div>
            <LinkButton
              className={styles.actionButton}
              href={reportProblemFormUrl}
            >
              Report a problem
            </LinkButton>
          </div>
        ) : (
          <div className={clsx(styles.card, styles.emphasize)}>
            <div
              className={styles.recipeTitle}
              data-testid="recipe-title"
            >
              {recipeTitle}
            </div>
            <div className={styles.flavorText}>{flavorText}</div>
          </div>
        )
      ) : isSupported ? (
        <div className={styles.card}>
          <div
            className={styles.text}
            data-testid="non-recipe-page-message"
          >
            To clip a recipe, make sure you’re on a recipe page.
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <div
            className={styles.text}
            data-testid="unsupported-site-message"
          >
            Sorry! It looks like we don’t support clipping recipes from this
            site.
          </div>
          <LinkButton
            className={styles.actionButton}
            href={requestFormUrl.toString()}
          >
            Request support for this site
          </LinkButton>
        </div>
      )}
    </div>
  );
};
export default App;
