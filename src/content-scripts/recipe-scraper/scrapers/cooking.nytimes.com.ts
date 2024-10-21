import { array, string } from "decoders";
import { RecipeParseError } from "~/errors";
import { BaseScraper, type Executor, type LoadReturn, type Scraper } from ".";

interface IngredientsGroup {
  ingredients: string[];
  name?: string;
}

interface Props {
  customExecuteInPageScope?: Executor;
}

export default class TimesScraper extends BaseScraper implements Scraper {
  alerts: string[];
  recipeJson: Record<string, unknown>;

  constructor({ customExecuteInPageScope }: Props = {}) {
    super({ executeInPageScope: customExecuteInPageScope });

    this.alerts = [];
    this.recipeJson = {};
  }

  async _getAttribution() {
    try {
      const attribution = await this._executeInPageScope(() => {
        const attributionElements =
          window.document.querySelectorAll<HTMLElement>('h2[class*="byline"]');

        if (attributionElements.length === 0) {
          return null;
        }

        if (attributionElements.length > 2) {
          throw new RecipeParseError(
            "More than two lines of attribution detected.",
          );
        }

        if (attributionElements.length === 1) {
          const attributionText = attributionElements[0]?.innerText.trim();

          if (!attributionText) {
            return null;
          }

          const matches = attributionText.match(/^By\s*(.*)$/);

          if (matches === null) {
            return null;
          }

          const [attribution] = matches;

          if (!attribution || matches.length !== 2) {
            return null;
          }

          return attribution;
        }

        if (attributionElements.length === 2) {
          const recipeFromText = attributionElements[0]?.innerText.trim();
          const adaptedByText = attributionElements[1]?.innerText.trim();

          if (!recipeFromText || !adaptedByText) {
            return null;
          }

          if (
            /^Recipe from\s*(.*)$/.test(recipeFromText) &&
            /^Adapted by\s*(.*)$/.test(adaptedByText)
          ) {
            return `${recipeFromText}, ${adaptedByText}`;
          }
        }

        return null;
      });

      return attribution;
    } catch (error) {
      if (error instanceof RecipeParseError) {
        this.alerts.push(error.message);
      } else {
        throw error;
      }
    }

    return null;
  }

  async _getIngredientGroups(): Promise<IngredientsGroup[]> {
    const ingredients = array(string).verify(this.recipeJson.recipeIngredient);

    return [{ ingredients: ingredients }];
    const ingredientGroups = await this._executeInPageScope(() => {
      const ingredientListItemElements = Array.from(
        window.document.querySelectorAll<HTMLElement>(
          'div[class*="recipebody_ingredients"] ul li[class*="ingredient_ingredient"], div[class*="recipebody_ingredients"] ul h3[class*="ingredientgroup_name"]',
        ),
      );

      return ingredientListItemElements.reduce<IngredientsGroup[]>(
        (ingredients, listItemElement) => {
          let listItemText =
            listItemElement.textContent ?? "".trim().replace(/\s+/g, " ");

          if (listItemElement.childNodes.length > 1) {
            listItemText = Array.from(listItemElement.childNodes)
              .reduce<string[]>((strings, element) => {
                if (element instanceof HTMLElement) {
                  return [...strings, element.innerText];
                } else if (element instanceof Text) {
                  return [...strings, element.wholeText];
                }

                return strings;
              }, [])
              .join(" ");
          }

          if (listItemElement.tagName.toLowerCase() === "h3") {
            return [...ingredients, { name: listItemText, ingredients: [] }];
          }

          const previousIngredientsGroups = ingredients.slice(0, -1);

          const currentIngredientsGroup =
            ingredients.length === 0
              ? { ingredients: [] }
              : ingredients[ingredients.length - 1];

          console.log(previousIngredientsGroups, currentIngredientsGroup);

          currentIngredientsGroup.ingredients = [
            ...currentIngredientsGroup.ingredients,
            listItemText,
          ];

          return [...previousIngredientsGroups, currentIngredientsGroup];
        },
        [],
      );
    });

    return ingredientGroups;
  }

  async _getRecipeJson() {
    const recipeJson = await this._executeInPageScope(() => {
      const scriptBlocks = document.querySelectorAll<HTMLElement>(
        "script[type='application/ld+json']",
      );

      if (scriptBlocks.length !== 1) {
        throw new Error("Could not load recipe JSON.");
      }

      const rawScriptContent = scriptBlocks[0].textContent;

      if (!rawScriptContent) {
        throw new Error("Could not load recipe JSON.");
      }

      return JSON.parse(rawScriptContent);
    });

    this.recipeJson = recipeJson;
  }

  async _getTime() {
    return this._executeInPageScope(() => {
      const statsElements = window.document.querySelectorAll<HTMLElement>(
        'div[class*="stats_cookingTimeTable"] > *',
      );

      if (statsElements.length !== 2) {
        return null;
      }

      const [label, time] = statsElements;

      if (label?.innerText !== "Total Time") {
        return null;
      }

      return time?.innerText.trim() ?? null;
    });
  }

  async _getTitle() {
    return this._executeInPageScope(() => {
      const titleElement = window.document.querySelector<HTMLElement>(
        'h1[class*="pantry--title-display"]',
      );

      if (!titleElement) {
        throw new Error("Recipe title could not be found on the page.");
      }

      return titleElement.innerText.trim();
    });
  }

  async _getUrl() {
    const href = await this._executeInPageScope(() => window.location.href);
    const url = new URL(href);

    return url.origin + url.pathname;
  }

  async load(): Promise<LoadReturn> {
    await this._getRecipeJson();

    const [attribution, ingredientGroups, time, title, url] = await Promise.all(
      [
        this._getAttribution(),
        this._getIngredientGroups(),
        this._getTime(),
        this._getTitle(),
        this._getUrl(),
      ],
    );

    return {
      alerts: this.alerts,
      recipe: { attribution, ingredientGroups, time, title, url },
    };
  }
}
