import { BaseScraper, type Executor, type Scraper } from ".";

interface Props {
  customExecuteInPageScope?: Executor;
}

export default class TimesScraper extends BaseScraper implements Scraper {
  constructor({ customExecuteInPageScope }: Props = {}) {
    super({ executeInPageScope: customExecuteInPageScope });
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

  async load() {
    const [time, title, url] = await Promise.all([
      this._getTime(),
      this._getTitle(),
      this._getUrl(),
    ]);

    return { time, title, url };
  }
}
