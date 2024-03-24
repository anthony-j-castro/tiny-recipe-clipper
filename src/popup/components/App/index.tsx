import config from "~/config";
import useGetMe from "~/hooks/useGetUserId";
import IconNav from "~/popup/components/IconNav";
import LinkPrimaryButton from "~/ui-shared/components/LinkPrimaryButton";
import { AppContainer, Card, Text, TopRow } from "./styled";

const App = () => {
  const { data: userId, isPending } = useGetMe();

  return (
    <AppContainer>
      <TopRow>
        <IconNav />
      </TopRow>
      {isPending ? null : userId === undefined ? (
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
