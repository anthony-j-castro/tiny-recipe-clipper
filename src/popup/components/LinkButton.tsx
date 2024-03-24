import { ComponentPropsWithoutRef, MouseEvent } from "react";
import Button from "~/ui-shared/components/Button";

interface Props extends ComponentPropsWithoutRef<"button"> {
  href: string;
  onClick?: () => void | Promise<void>;
}

const LinkButton = (props: Props) => {
  const { href, onClick, ...rest } = props;

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
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
