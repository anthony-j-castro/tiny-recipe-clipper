import { Tooltip } from "react-aria-components";
import styled, { css } from "styled-components";

export const StyledTooltip = styled(Tooltip)(
  ({ theme }) => css`
    font-size: 12px;
    font-weight: 400;
    color: ${theme.colors.white};
    background: ${theme.colors.nearBlack};
    padding: 4px 8px;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &[data-placement="top"] {
      margin-bottom: 8px;
    }

    &[data-placement="bottom"] {
      margin-top: 8px;

      & .react-aria-OverlayArrow svg {
        transform: rotate(180deg);
      }
    }

    &[data-placement="right"] {
      margin-left: 8px;

      & .react-aria-OverlayArrow svg {
        transform: rotate(90deg);
      }
    }

    &[data-placement="left"] {
      margin-right: 8px;

      & .react-aria-OverlayArrow svg {
        transform: rotate(-90deg);
      }
    }

    & .react-aria-OverlayArrow svg {
      display: block;
      fill: ${theme.colors.nearBlack};
    }
  `,
);
