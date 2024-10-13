import type { Scraper } from "~/content-scripts/recipe-scraper/scrapers";
import TimesScraper from "~/content-scripts/recipe-scraper/scrapers/cooking.nytimes.com";

const instantiateScraper = (url: string): Scraper | undefined => {
  try {
    const { hostname } = new URL(url);

    switch (hostname) {
      case "cooking.nytimes.com": {
        return new TimesScraper();
      }

      default: {
        return undefined;
      }
    }
  } catch (error) {
    return undefined;
  }
};

export default instantiateScraper;
