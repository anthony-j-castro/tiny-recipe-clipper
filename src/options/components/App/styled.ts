import { Separator as AriakitSeparator } from "@ariakit/react/separator";
import styled, { css } from "styled-components";

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
  margin-right: 16px;
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

export const Separator = styled(AriakitSeparator)(
  ({ theme }) => css`
    width: 100%;
    height: 1px;
    border: 0;
    background: ${theme.colors.gray};

    &&& {
      margin: 32px 0;
    }
  `,
);

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
