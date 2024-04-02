import { BaseScraper, Executor, Scraper } from ".";

interface Props {
  customExecuteInPageScope?: Executor;
}

export default class TimesScraper extends BaseScraper implements Scraper {
  constructor({ customExecuteInPageScope }: Props = {}) {
    super({ executeInPageScope: customExecuteInPageScope });
  }

  async load() {
    const [title] = await Promise.all([this._getTitle()]);

    return { title };
  }

  async _getTitle() {
    return this._executeInPageScope(() => {
      const titleElement = window.document.querySelector<HTMLElement>(
        'h1[class*="pantry--title-display"]',
      );

      return titleElement?.innerText.trim() ?? null;
    });
  }
}
