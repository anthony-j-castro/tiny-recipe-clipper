export interface Recipe {
  attribution: string | null;
  image: string | null;
  ingredientGroups: Array<{
    ingredients: string[];
    name?: string;
  }>;
  time: string | null;
  title: string;
  url: string;
  yield: string | null;
}
