class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BaseError";
  }
}

export class ImpossibleStateError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "ImpossibleStateError";
  }
}

export class RecipeParseError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "RecipeParseError";
  }
}
