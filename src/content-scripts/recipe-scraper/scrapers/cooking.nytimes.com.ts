import { RecipeParseError } from "~/errors";
import { BaseScraper, type Executor, type LoadReturn, type Scraper } from ".";

interface Props {
  customExecuteInPageScope?: Executor;
}

export default class TimesScraper extends BaseScraper implements Scraper {
  alerts: string[];

  constructor({ customExecuteInPageScope }: Props = {}) {
    super({ executeInPageScope: customExecuteInPageScope });

    this.alerts = [];
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
          const attributionText = attributionElements[0].innerText;

          if (attributionText === "") {
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
          const recipeFromText = attributionElements[0].innerText.trim();
          const adaptedByText = attributionElements[1].innerText.trim();

          if (recipeFromText === "" || adaptedByText === "") {
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

  async _getTime() {
    return this._executeInPageScope(() => {
      const statsElements = window.document.querySelectorAll<HTMLElement>(
        'div[class*="stats_cookingTimeTable"] > *',
      );

      if (statsElements.length !== 2) {
        return null;
      }

      const [label, time] = statsElements;

      if (label.innerText !== "Total Time") {
        return null;
      }

      return time.innerText.trim();
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
    const [attribution, time, title, url] = await Promise.all([
      this._getAttribution(),
      this._getTime(),
      this._getTitle(),
      this._getUrl(),
    ]);

    return { alerts: this.alerts, recipe: { attribution, time, title, url } };
  }
}
