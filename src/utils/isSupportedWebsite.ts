import { SUPPORTED_HOSTNAMES_DATA } from "~/constants";

const isSupportedWebsite = (url: string) => {
  try {
    const { hostname } = new URL(url);

    return Object.prototype.hasOwnProperty.call(
      SUPPORTED_HOSTNAMES_DATA,
      hostname,
    );
  } catch {
    return false;
  }
};

export default isSupportedWebsite;
