import { TooltipTrigger } from "react-aria-components";
import { getExtensionUrl } from "~/chrome-helpers";
import config from "~/config";
import useGetCurrentTab from "~/hooks/useGetCurrentTab";
import IconButton from "~/popup/components/IconButton";
import BugIcon from "~/ui-shared/components/icons/BugIcon";
import SettingsIcon from "~/ui-shared/components/icons/SettingsIcon";
import WebIcon from "~/ui-shared/components/icons/WebIcon";
import Tooltip from "~/ui-shared/components/Tooltip";
import getReportProblemFormUrl from "~/utils/getReportProblemFormUrl";
import styles from "./style.module.css";

const IconNav = () => {
  const { data: currentTab } = useGetCurrentTab();

  const reportProblemFormUrl = getReportProblemFormUrl(currentTab?.url);

  return (
    <div className={styles.container}>
      <TooltipTrigger>
        <IconButton href={config.WEB_APP.ORIGIN}>
          <WebIcon className={styles.icon} />
        </IconButton>
        <Tooltip>Open website</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton href={getExtensionUrl("options.html")}>
          <SettingsIcon className={styles.icon} />
        </IconButton>
        <Tooltip>Open extension options</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton href={reportProblemFormUrl}>
          <BugIcon className={styles.icon} />
        </IconButton>
        <Tooltip>Report a problem</Tooltip>
      </TooltipTrigger>
    </div>
  );
};

export default IconNav;
