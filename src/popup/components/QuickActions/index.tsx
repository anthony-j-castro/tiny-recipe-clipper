import { getExtensionUrl } from "~/chrome-helpers";
import config from "~/config";
import IconButton from "~/popup/components/IconButton";
import { Container } from "./styled";

const QuickActions = () => (
  <Container>
    <IconButton
      href={getExtensionUrl("options.html")}
      title="Open extension options"
    >
      Settings
    </IconButton>
    <IconButton
      href={config.WEB_APP.ORIGIN}
      title="Report a problem"
    >
      Bug
    </IconButton>
    <IconButton
      href={config.WEB_APP.ORIGIN}
      title="Open website"
    >
      Website
    </IconButton>
  </Container>
);

export default QuickActions;
