import styled from "styled-components";
import WebIcon from "~/ui-shared/components/icons/WebIcon";

export const Container = styled.div`
  display: flex;

  & > :not(:first-child) {
    margin-left: 4px;
  }
`;

export const OpenWebsiteIcon = styled(WebIcon)`
  display: block;
  width: 16px;
  height: 16px;
`;
