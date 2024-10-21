import { formatDuration } from "date-fns";
import { array, string } from "decoders";
import { parse } from "iso8601-duration";
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
    const durationString = string.verify(this.recipeJson.totalTime);

    const duration = parse(durationString);

    return formatDuration(duration);
  }

  async _getTitle() {
    const title = string.verify(this.recipeJson.name);

    return title;
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
