interface Recipe {
  attribution: string | null;
  time: string | null;
  title: string;
  url: string;
}

export interface LoadReturn {
  alerts: string[];
  recipe: Recipe;
}

export interface Scraper {
  _getAttribution: () => Promise<string | null>;
  _getTime: () => Promise<string | null>;
  _getTitle: () => Promise<string>;
  _getUrl: () => Promise<string>;
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
