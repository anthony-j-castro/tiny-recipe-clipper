import { sendMessageToBackground } from "~/chrome-helpers";
import config from "~/config";
import useGetMe from "~/hooks/useGetUserId";
import IconNav from "~/popup/components/IconNav";
import LinkPrimaryButton from "~/ui-shared/components/LinkPrimaryButton";
import { AppContainer, Card, ClipRecipeButton, Text, TopRow } from "./styled";

const App = () => {
  const { data: userId, isPending } = useGetMe();

  const isRequiresSync = userId === undefined;

  // TODO: Add conditions to show/enable the clip recipe button once valid website/recipe detection is implemented.
  return (
    <AppContainer>
      <TopRow>
        <IconNav />
        {!isRequiresSync ? (
          <ClipRecipeButton
            onClick={() => {
              sendMessageToBackground({
                sender: "popup",
                type: "SEND_RECIPE_DATA",
              });
            }}
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
          <LinkPrimaryButton
            href={`${config.WEB_APP.ORIGIN}${config.WEB_APP.BROWSER_EXTENSION_PATH}`}
          >
            Launch Tiny Recipe Box in a new tab
          </LinkPrimaryButton>
        </Card>
      ) : (
        <div>Display app</div>
      )}
    </AppContainer>
  );
};
export default App;
