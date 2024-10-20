interface Recipe {
  title: string;
  url: string;
}

export interface Scraper {
  _getTime: () => Promise<string | null>;
  _getTitle: () => Promise<string>;
  _getUrl: () => Promise<string>;
  load: () => Promise<Recipe>;
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
