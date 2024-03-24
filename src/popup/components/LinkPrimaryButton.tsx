import React from "react";
import PrimaryButton from "~/ui-shared/components/PrimaryButton";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  href: string;
  onClick?: () => void | Promise<void>;
}

const LinkPrimaryButton = (props: Props) => {
  const { href, onClick, ...rest } = props;

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (onClick) {
      await onClick();
    }

    window.open(href, "_blank");
  };

  return (
    <PrimaryButton
      {...rest}
      onClick={handleClick}
    />
  );
};

export default LinkPrimaryButton;
