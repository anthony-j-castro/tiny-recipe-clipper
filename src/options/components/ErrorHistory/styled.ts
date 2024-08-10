import styled, { css } from "styled-components";
import HorizontalSeparator from "~/options/components/HorizontalSeparator";

export const DisclosureWrapper = styled.details(
  ({ theme }) => css`
    background: ${theme.colors.lightGray};
    padding: 4px 8px;
    border-radius: 4px;
    margin-top: 32px;
  `,
);

export const Disclosure = styled.summary(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    width: calc(100% + 8px);
    background: none;
    text-align: left;
    font-weight: 500;
    padding: 8px 4px;
    border: none;
    border-radius: 4px;
    margin: 0 -4px;

    &:hover {
      background: ${theme.colors.gray};
    }
  `,
);

export const DisclosureContentSeparator = styled(HorizontalSeparator)`
  margin: 4px 0;
`;

export const Table = styled.table`
  display: block;
  font-family: monospace;
  border-collapse: collapse;
  overflow: auto;
  margin-top: 12px;
  user-select: text;
`;

export const HeaderCell = styled.th(
  ({ theme }) => css`
    text-align: left;
    font-weight: 700;
    white-space: nowrap;
    padding: 4px 16px 4px 4px;
    border-left: 1px solid ${theme.colors.nearBlack};
  `,
);

export const Cell = styled.td(
  ({ theme }) => css`
    white-space: nowrap;
    padding: 4px 16px 4px 4px;
    border-left: 1px solid ${theme.colors.nearBlack};
  `,
);

export const IconWithMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0 8px;
`;
