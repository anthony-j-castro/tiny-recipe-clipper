import BaseParser, { Executor, Parser } from ".";

interface Props {
  customExecuteInPageScope?: Executor;
}

export default class TimesParser extends BaseParser implements Parser {
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
