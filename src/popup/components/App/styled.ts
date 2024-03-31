import styled, { css } from "styled-components";
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
  margin-bottom: 12px;
`;
