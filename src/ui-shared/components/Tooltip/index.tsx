import type { ReactNode } from "react";
import { OverlayArrow } from "react-aria-components";
import { StyledTooltip } from "./styled";

interface Props {
  children: ReactNode;
}

const Tooltip = ({ children }: Props) => (
  <StyledTooltip>
    <OverlayArrow>
      <svg
        height={8}
        viewBox="0 0 8 8"
        width={8}
      >
        <path d="M0 0 L4 4 L8 0" />
      </svg>
    </OverlayArrow>
    {children}
  </StyledTooltip>
);

export default Tooltip;
