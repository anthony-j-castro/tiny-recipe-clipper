import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { Button as BaseButton } from "react-aria-components";
import styles from "./style.module.css";

const Button = (props: ComponentPropsWithoutRef<typeof BaseButton>) => {
  const { className, ...rest } = props;

  return (
    <BaseButton
      {...rest}
      className={clsx(styles.button, className)}
    />
  );
};

export default Button;
