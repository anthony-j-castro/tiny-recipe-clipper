interface HostnameData {
  RECIPE_PAGE_PATHNAME_REGEX: RegExp;
}

export const SUPPORTED_HOSTNAMES_DATA: Partial<Record<string, HostnameData>> = {
  "cooking.nytimes.com": { RECIPE_PAGE_PATHNAME_REGEX: /\/recipes\// },
};
