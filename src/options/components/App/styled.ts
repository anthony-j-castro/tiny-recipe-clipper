import styled, { css } from "styled-components";
import HorizontalSeparator from "~/options/components/HorizontalSeparator";
import BaseInfoIcon from "~/ui-shared/components/icons/InfoIcon";
import LinkPrimaryButton from "~/ui-shared/components/LinkPrimaryButton";

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  width: 48px;
  height: 48px;
`;

export const Title = styled.h1`
  font-weight: 700;
  margin: 0 0 0 16px;
`;

export const Main = styled.main`
  margin-top: 32px;
`;

export const Label = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const DescriptionParagraph = styled.p(
  ({ theme }) => css`
    font-size: 12px;
    line-height: 1.25em;
    color: ${theme.colors.darkGray};
    margin: 4px 0 0;
  `,
);

export const UserId = styled.span`
  font-family: monospace;
  user-select: text;
`;

export const Separator = styled(HorizontalSeparator)`
  margin: 32px 0;
`;

export const SectionHeading = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 16px;
`;

export const VersionInformation = styled.div`
  user-select: text;
`;

export const VersionNumber = styled.span`
  font-family: monospace;
`;

export const InfoBanner = styled.div(
  ({ theme }) => css`
    font-size: 16px;
    font-weight: 500;
    background: ${theme.colors.lightGray};
    padding: 8px;
    border-radius: 4px;
    margin: 0 -8px 32px -8px;
  `,
);

export const InnerBannerContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const InfoIcon = styled(BaseInfoIcon)`
  display: block;
  width: 20px;
  height: 20px;
`;

export const BannerCopy = styled.div`
  flex-grow: 1;
  margin-top: 2px;
  margin-left: 16px;
`;

export const BannerButton = styled(LinkPrimaryButton)`
  display: inline-block;
  width: auto;
  margin-top: 16px;
`;
