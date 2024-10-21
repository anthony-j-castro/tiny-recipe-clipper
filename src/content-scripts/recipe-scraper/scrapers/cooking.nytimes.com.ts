import { formatDuration } from "date-fns";
import { array, nonEmptyString, object, string } from "decoders";
import { parse } from "iso8601-duration";
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
    const author = object({ name: nonEmptyString }).value(
      this.recipeJson.author,
    );

    if (author === undefined) {
      return null;
    }

    return `By ${author.name}`;
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

  async _getYield() {
    const recipeYield = string.verify(this.recipeJson.recipeYield);

    return recipeYield;
  }

  async load(): Promise<LoadReturn> {
    await this._getRecipeJson();

    const [attribution, ingredientGroups, time, title, url, recipeYield] =
      await Promise.all([
        this._getAttribution(),
        this._getIngredientGroups(),
        this._getTime(),
        this._getTitle(),
        this._getUrl(),
        this._getYield(),
      ]);

    return {
      alerts: this.alerts,
      recipe: {
        attribution,
        ingredientGroups,
        time,
        title,
        url,
        yield: recipeYield,
      },
    };
  }
}
