import type { ComponentPropsWithoutRef } from "react";
import PrimaryButton from "~/ui-shared/components/PrimaryButton";

interface Props extends ComponentPropsWithoutRef<typeof PrimaryButton> {
  href: string;
  onPress?: () => Promise<void> | void;
}

const LinkPrimaryButton = (props: Props) => {
  const { href, onPress, ...rest } = props;

  const handlePress = async () => {
    if (onPress) {
      await onPress();
    }

    window.open(href, "_blank");
  };

  return (
    <PrimaryButton
      {...rest}
      onPress={handlePress}
    />
  );
};

export default LinkPrimaryButton;
