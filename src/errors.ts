class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ImpossibleStateError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}

export class RecipeParseError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}
