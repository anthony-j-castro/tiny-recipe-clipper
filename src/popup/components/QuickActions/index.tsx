import BugReportIcon from "@mui/icons-material/BugReport";
import SettingsIcon from "@mui/icons-material/Settings";
import WebIcon from "@mui/icons-material/Web";
import { getExtensionUrl } from "~/chrome-helpers";
import config from "~/config";
import IconButton from "~/popup/components/IconButton";
import { Container } from "./styled";

const ICON_OPTIONS = { display: "block", fontSize: 16 };

const QuickActions = () => (
  <Container>
    <IconButton
      href={getExtensionUrl("options.html")}
      title="Open extension options"
    >
      <SettingsIcon sx={ICON_OPTIONS} />
    </IconButton>
    <IconButton
      href={config.WEB_APP.ORIGIN}
      title="Report a problem"
    >
      <BugReportIcon sx={ICON_OPTIONS} />
    </IconButton>
    <IconButton
      href={config.WEB_APP.ORIGIN}
      title="Open website"
    >
      <WebIcon sx={ICON_OPTIONS} />
    </IconButton>
  </Container>
);

export default QuickActions;
