import styled, { css } from "styled-components";
import Button from "~/ui-shared/components/Button";

const PrimaryButton = styled(Button)(
  ({ theme }) => css`
    --button-background-color: #4100b3;
    --button-text-color: ${theme.colors.white};
    --button-hover-background-color: #33008c;
  `,
);

export default PrimaryButton;
