import BugReportIcon from "@mui/icons-material/BugReport";
import SettingsIcon from "@mui/icons-material/Settings";
import WebIcon from "@mui/icons-material/Web";
import { getExtensionUrl } from "~/chrome-helpers";
import config from "~/config";
import useGetCurrentTab from "~/hooks/useGetCurrentTab";
import IconButton from "~/popup/components/IconButton";
import { Container } from "./styled";

const ICON_OPTIONS = { display: "block", fontSize: 16 };

const IconNav = () => {
  const { data: currentTab } = useGetCurrentTab();

  const reportProblemFormUrl = new URL(config.REPORT_PROBLEM_FORM.URL);
  reportProblemFormUrl.searchParams.set(
    config.REPORT_PROBLEM_FORM.VERSION_LINK_PARAM,
    config.VERSION,
  );
  if (currentTab?.url) {
    reportProblemFormUrl.searchParams.set(
      config.REPORT_PROBLEM_FORM.WEBSITE_LINK_PARAM,
      currentTab.url,
    );
  }

  return (
    <Container>
      <IconButton
        href={config.WEB_APP.ORIGIN}
        title="Open website"
      >
        <WebIcon sx={ICON_OPTIONS} />
      </IconButton>
      <IconButton
        href={getExtensionUrl("options.html")}
        title="Open extension options"
      >
        <SettingsIcon sx={ICON_OPTIONS} />
      </IconButton>
      <IconButton
        href={reportProblemFormUrl.toString()}
        title="Report a problem"
      >
        <BugReportIcon sx={ICON_OPTIONS} />
      </IconButton>
    </Container>
  );
};

export default IconNav;
