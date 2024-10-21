import { Recipe } from "~/types";

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
}

export type Executor = <T>(instructions: () => T) => Promise<T>;

export class BaseScraper {
  _executeInPageScope: Executor;

  constructor({
    executeInPageScope = async <T>(instructions: () => T) => instructions(),
  }: {
    executeInPageScope?: Executor;
  }) {
    this._executeInPageScope = executeInPageScope;
  }
}
