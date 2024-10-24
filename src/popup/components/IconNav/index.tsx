import { TooltipTrigger } from "react-aria-components";
import { getExtensionUrl } from "~/chrome-helpers";
import config from "~/config";
import useGetCurrentTab from "~/hooks/useGetCurrentTab";
import IconButton from "~/popup/components/IconButton";
import Tooltip from "~/ui-shared/components/Tooltip";
import getReportProblemFormUrl from "~/utils/getReportProblemFormUrl";
import {
  Container,
  OpenWebsiteIcon,
  ReportBugIcon,
  SettingsIcon,
} from "./styled";

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
          <SettingsIcon />
        </IconButton>
        <Tooltip>Open extension options</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton href={reportProblemFormUrl}>
          <ReportBugIcon />
        </IconButton>
        <Tooltip>Report a problem</Tooltip>
      </TooltipTrigger>
    </Container>
  );
};

export default IconNav;
