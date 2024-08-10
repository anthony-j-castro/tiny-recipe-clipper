import BugReportIcon from "@mui/icons-material/BugReport";
import SettingsIcon from "@mui/icons-material/Settings";
import WebIcon from "@mui/icons-material/Web";
import { TooltipTrigger } from "react-aria-components";
import { getExtensionUrl } from "~/chrome-helpers";
import config from "~/config";
import useGetCurrentTab from "~/hooks/useGetCurrentTab";
import IconButton from "~/popup/components/IconButton";
import Tooltip from "~/ui-shared/components/Tooltip";
import getReportProblemFormUrl from "~/utils/getReportProblemFormUrl";
import { Container } from "./styled";

const ICON_OPTIONS = { display: "block", fontSize: 16 };

const IconNav = () => {
  const { data: currentTab } = useGetCurrentTab();

  const reportProblemFormUrl = getReportProblemFormUrl(currentTab?.url);

  return (
    <Container>
      <TooltipTrigger>
        <IconButton href={config.WEB_APP.ORIGIN}>
          <WebIcon sx={ICON_OPTIONS} />
        </IconButton>
        <Tooltip>Open website</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton href={getExtensionUrl("options.html")}>
          <SettingsIcon sx={ICON_OPTIONS} />
        </IconButton>
        <Tooltip>Open extension options</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton href={reportProblemFormUrl}>
          <BugReportIcon sx={ICON_OPTIONS} />
        </IconButton>
        <Tooltip>Report a problem</Tooltip>
      </TooltipTrigger>
    </Container>
  );
};

export default IconNav;
