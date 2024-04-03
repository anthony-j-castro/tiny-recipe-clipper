import { BaseScraper, Executor, Scraper } from ".";

interface Props {
  customExecuteInPageScope?: Executor;
}

export default class TimesScraper extends BaseScraper implements Scraper {
  constructor({ customExecuteInPageScope }: Props = {}) {
    super({ executeInPageScope: customExecuteInPageScope });
  }

  async load() {
    const [title, url] = await Promise.all([this._getTitle(), this._getUrl()]);

    return { title, url };
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
}
