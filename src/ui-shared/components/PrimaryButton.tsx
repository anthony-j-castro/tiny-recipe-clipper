import styled, { css } from "styled-components";
import Button from "~/ui-shared/components/Button";

const PrimaryButton = styled(Button)(
  ({ theme }) => css`
    --button-background-color: ${theme.colors.purple};
    --button-text-color: ${theme.colors.white};
    --button-hover-background-color: ${theme.colors.darkPurple};
    --button-disabled-background-color: ${theme.colors.lightPurple};
  `,
);

export default PrimaryButton;
