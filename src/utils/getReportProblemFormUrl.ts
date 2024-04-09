import config from "~/config";

const getReportProblemFormUrl = (currentWebsiteUrl?: string) => {
  const reportProblemFormUrl = new URL(config.REPORT_PROBLEM_FORM.URL);
  reportProblemFormUrl.searchParams.set(
    config.REPORT_PROBLEM_FORM.VERSION_LINK_PARAM,
    config.VERSION,
  );

  if (currentWebsiteUrl) {
    reportProblemFormUrl.searchParams.set(
      config.REPORT_PROBLEM_FORM.WEBSITE_LINK_PARAM,
      currentWebsiteUrl,
    );
  }

  return reportProblemFormUrl.toString();
};

export default getReportProblemFormUrl;
