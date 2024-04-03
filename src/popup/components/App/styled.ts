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

export const Card = styled.div<{ $emphasize?: boolean }>(
  ({ $emphasize, theme }) => css`
    min-width: 200px;
    padding: 8px;
    border: ${$emphasize ? "2px" : "1px"} solid
      ${$emphasize ? theme.colors.purple : theme.colors.gray};
    border-radius: 4px;
  `,
);

export const RecipeTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

export const FlavorText = styled.div(
  ({ theme }) => css`
    font-size: 10px;
    color: ${theme.colors.darkGray};
    font-style: italic;
    text-align: center;
    margin-top: 16px;
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
