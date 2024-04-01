import styled, { css } from "styled-components";
import LinkButton from "~/popup/components/LinkButton";
import LinkPrimaryButton from "~/ui-shared/components/LinkPrimaryButton";
import PrimaryButton from "~/ui-shared/components/PrimaryButton";

export const AppContainer = styled.div`
  padding: 8px;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ClipRecipeButton = styled(PrimaryButton)`
  margin-left: 32px;
`;

export const Card = styled.div(
  ({ theme }) => css`
    padding: 8px;
    border: 1px solid ${theme.colors.gray};
    border-radius: 4px;
  `,
);

export const Text = styled.div`
  line-height: 1.25em;
`;

export const PrimaryActionButton = styled(LinkPrimaryButton)`
  margin-top: 12px;
`;

export const ActionButton = styled(LinkButton)`
  margin-top: 12px;
`;
