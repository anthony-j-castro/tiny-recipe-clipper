import { SUPPORTED_HOSTNAMES_DATA } from "~/constants";

const isRecipePage = (url: string) => {
  try {
    const { hostname, pathname } = new URL(url);

    const data = SUPPORTED_HOSTNAMES_DATA[hostname];

    if (data === undefined) {
      return false;
    }

    const { RECIPE_PAGE_PATHNAME_REGEX } = data;

    return RECIPE_PAGE_PATHNAME_REGEX.test(pathname);
  } catch {
    return false;
  }
};

export default isRecipePage;
