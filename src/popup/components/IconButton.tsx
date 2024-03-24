import styled, { css } from "styled-components";
import LinkButton from "~/popup/components/LinkButton";

const IconButton = styled(LinkButton)(
  ({ theme }) => css`
    --button-background-color: transparent;
    --button-text-color: ${theme.colors.darkGray};
    --button-hover-background-color: ${theme.colors.lightGray};
    width: auto;
    padding: 4px;
  `,
);

export default IconButton;
