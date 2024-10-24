import { Bug as BugIcon, Cog as CogIcon } from "mdi-material-ui";
import { TooltipTrigger } from "react-aria-components";
import { getExtensionUrl } from "~/chrome-helpers";
import config from "~/config";
import useGetCurrentTab from "~/hooks/useGetCurrentTab";
import IconButton from "~/popup/components/IconButton";
import Tooltip from "~/ui-shared/components/Tooltip";
import getReportProblemFormUrl from "~/utils/getReportProblemFormUrl";
import { Container, OpenWebsiteIcon } from "./styled";

const ICON_OPTIONS = { display: "block", fontSize: 16 };

const IconNav = () => {
  const { data: currentTab } = useGetCurrentTab();

  const reportProblemFormUrl = getReportProblemFormUrl(currentTab?.url);

  return (
    <Container>
      <TooltipTrigger>
        <IconButton href={config.WEB_APP.ORIGIN}>
          <OpenWebsiteIcon />
        </IconButton>
        <Tooltip>Open website</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton href={getExtensionUrl("options.html")}>
          <CogIcon sx={ICON_OPTIONS} />
        </IconButton>
        <Tooltip>Open extension options</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton href={reportProblemFormUrl}>
          <BugIcon sx={ICON_OPTIONS} />
        </IconButton>
        <Tooltip>Report a problem</Tooltip>
      </TooltipTrigger>
    </Container>
  );
};

export default IconNav;
