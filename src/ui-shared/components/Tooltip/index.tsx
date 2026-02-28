import type { ReactNode } from "react";
import { Tooltip as BaseTooltip, OverlayArrow } from "react-aria-components";
import styles from "./style.module.css";

interface Props {
  children: ReactNode;
}

const Tooltip = ({ children }: Props) => (
  <BaseTooltip className={styles.tooltip}>
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
  </BaseTooltip>
);

export default Tooltip;
