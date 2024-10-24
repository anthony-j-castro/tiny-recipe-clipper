import type { ComponentProps } from "react";
import BaseIcon from "./BaseIcon";

const ChevronDownIcon = (props: ComponentProps<typeof BaseIcon>) => (
  <BaseIcon
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
  </BaseIcon>
);

export default ChevronDownIcon;
