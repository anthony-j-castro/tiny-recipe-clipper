type Recipe = {
  title: string | null;
  url: string;
};

export interface Scraper {
  _getTitle: () => Promise<string | null>;
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
