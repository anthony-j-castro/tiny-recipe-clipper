import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import Button from "~/ui-shared/components/Button";
import styles from "./style.module.css";

const PrimaryButton = (props: ComponentPropsWithoutRef<typeof Button>) => {
  const { className, ...rest } = props;

  return (
    <Button
      {...rest}
      className={clsx(styles.primary, className)}
    />
  );
};

export default PrimaryButton;
