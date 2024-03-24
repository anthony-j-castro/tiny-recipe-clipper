import { Button as AriakitButton } from "@ariakit/react/button";
import styled, { css } from "styled-components";

const Button = styled(AriakitButton)(
  ({ theme }) => css`
    --button-background-color: ${theme.colors.lightGray};
    --button-text-color: ${theme.colors.nearBlack};
    --button-hover-background-color: ${theme.colors.gray};
    display: block;
    width: 100%;
    background: var(--button-background-color);
    border: none;
    border-radius: 4px;
    color: var(--button-text-color);
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    padding: 8px 16px;
    white-space: nowrap;

    &:hover {
      background: var(--button-hover-background-color);
    }

    &:focus-visible {
      outline-width: 2px;
      outline-style: solid;
      outline-offset: 2px;
    }
  `,
);

export default Button;
