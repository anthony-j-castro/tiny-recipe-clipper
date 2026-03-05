import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { useSeparator } from "react-aria";
import styles from "./style.module.css";

const HorizontalSeparator = (props: ComponentPropsWithoutRef<"hr">) => {
  const { className, ...rest } = props;

  const { separatorProps } = useSeparator({
    ...rest,
    orientation: "horizontal",
  });

  return (
    <hr
      {...rest}
      className={clsx(styles.separator, className)}
      {...separatorProps}
    />
  );
};

export default HorizontalSeparator;
