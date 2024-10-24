import type { ComponentProps } from "react";
import BaseIcon from "./BaseIcon";

const ChevronUpIcon = (props: ComponentProps<typeof BaseIcon>) => (
  <BaseIcon
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
  </BaseIcon>
);

export default ChevronUpIcon;
