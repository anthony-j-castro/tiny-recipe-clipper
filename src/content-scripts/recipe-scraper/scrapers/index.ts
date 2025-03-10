import { Recipe } from "~/types";

export type Executor = <T>(
  instructions: (args?: Record<string, unknown>) => T,
  args?: Record<string, unknown>,
) => Promise<T>;

export interface LoadReturn {
  alerts: string[];
  recipe: Recipe;
}

export interface Scraper {
  _getAttribution: () => Promise<string | null>;
  _getIngredientGroups: () => Promise<
    Array<{ ingredients: string[]; name?: string }>
  >;
  _getTime: () => Promise<string | null>;
  _getTitle: () => Promise<string>;
  _getUrl: () => Promise<string>;
  _getYield: () => Promise<string | null>;
  load: () => Promise<LoadReturn>;
  _getImageUrl?: () => string | null;
}

export class BaseScraper {
  _executeInPageScope: Executor;

  constructor({
    executeInPageScope = async <T>(
      instructions: (args?: Record<string, unknown>) => T,
      args?: Record<string, unknown>,
    ) => instructions(args),
  }: {
    executeInPageScope?: Executor;
  }) {
    this._executeInPageScope = executeInPageScope;
  }
}
