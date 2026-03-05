import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import LinkButton from "~/popup/components/LinkButton";
import styles from "./style.module.css";

const IconButton = (props: ComponentPropsWithoutRef<typeof LinkButton>) => {
  const { className, ...rest } = props;

  return (
    <LinkButton
      {...rest}
      className={clsx(styles.button, className)}
    />
  );
};

export default IconButton;
