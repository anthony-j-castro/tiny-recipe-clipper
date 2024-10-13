import type { ComponentPropsWithoutRef } from "react";
import Button from "~/ui-shared/components/Button";

interface Props extends ComponentPropsWithoutRef<typeof Button> {
  href: string;
  onPress?: () => Promise<void> | void;
}

const LinkButton = (props: Props) => {
  const { href, onPress, ...rest } = props;

  const handlePress = async () => {
    if (onPress) {
      await onPress();
    }

    window.open(href, "_blank");
  };

  return (
    <Button
      {...rest}
      onPress={handlePress}
    />
  );
};

export default LinkButton;
