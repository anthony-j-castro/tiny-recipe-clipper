import type { ComponentProps } from "react";
import BaseIcon from "./BaseIcon";

const WebIcon = (props: ComponentProps<typeof BaseIcon>) => (
  <BaseIcon
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h420v-140H160v140Zm500 0h140v-360H660v360ZM160-460h420v-140H160v140Z" />
  </BaseIcon>
);

export default WebIcon;
