type Recipe = {
  title: string | null;
};

export interface Parser {
  _getTitle: () => Promise<string | null>;
  load: () => Promise<Recipe>;
}

export type Executor = <T>(instructions: () => T) => Promise<T>;

export default class BaseParser {
  _executeInPageScope: Executor;

  constructor({
    executeInPageScope = async <T>(instructions: () => T) => instructions(),
  }: {
    executeInPageScope?: Executor;
  }) {
    this._executeInPageScope = executeInPageScope;
  }
}
