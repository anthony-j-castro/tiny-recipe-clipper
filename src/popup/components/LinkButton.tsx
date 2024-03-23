import React from "react";
import Button from "~/ui-shared/components/Button";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  href: string;
  onClick?: () => void | Promise<void>;
}

const LinkButton = (props: Props) => {
  const { href, onClick, ...rest } = props;

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (onClick) {
      await onClick();
    }

    window.open(href, "_blank");
  };

  return (
    <Button
      {...rest}
      onClick={handleClick}
    />
  );
};

export default LinkButton;
