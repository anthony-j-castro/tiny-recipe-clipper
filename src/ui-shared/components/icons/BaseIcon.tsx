import type { SVGProps } from "react";

const BaseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  />
);

export default BaseIcon;
