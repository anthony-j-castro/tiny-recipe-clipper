import styled, { css } from "styled-components";
import BugIcon from "~/ui-shared/components/icons/BugIcon";
import BaseSettingsIcon from "~/ui-shared/components/icons/SettingsIcon";
import WebIcon from "~/ui-shared/components/icons/WebIcon";

export const Container = styled.div`
  display: flex;

  & > :not(:first-child) {
    margin-left: 4px;
  }
`;

const iconStyles = css`
  display: block;
  width: 16px;
  height: 16px;
`;

export const OpenWebsiteIcon = styled(WebIcon)(() => iconStyles);

export const SettingsIcon = styled(BaseSettingsIcon)(() => iconStyles);

export const ReportBugIcon = styled(BugIcon)(() => iconStyles);
