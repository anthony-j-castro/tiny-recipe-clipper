import "styled-components";
import type theme from "~/ui-shared/theme";

type CustomTheme = typeof theme;

declare module "styled-components" {
  export type DefaultTheme = CustomTheme;
}
