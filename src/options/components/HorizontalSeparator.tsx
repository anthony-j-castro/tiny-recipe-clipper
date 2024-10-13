import type { ComponentPropsWithoutRef } from "react";
import { useSeparator } from "react-aria";
import styled, { css } from "styled-components";

const Separator = styled.hr(
  ({ theme }) => css`
    width: 100%;
    height: 1px;
    border: 0;
    background: ${theme.colors.gray};
  `,
);

const HorizontalSeparator = (props: ComponentPropsWithoutRef<"hr">) => {
  const { separatorProps } = useSeparator({
    ...props,
    orientation: "horizontal",
  });

  return (
    <Separator
      {...props}
      {...separatorProps}
    />
  );
};

export default HorizontalSeparator;
