/// <reference types="node" />
const ENV = {
  BUILD_ENV:
    typeof process !== "undefined"
      ? (process.env.BUILD_ENV ?? process.env.VITE_BUILD_ENV)
      : import.meta.env?.VITE_BUILD_ENV,
  ROLLBAR_ACCESS_TOKEN:
    typeof process !== "undefined"
      ? (process?.env?.ROLLBAR_ACCESS_TOKEN ??
        process?.env?.VITE_ROLLBAR_ACCESS_TOKEN)
      : import.meta.env?.VITE_ROLLBAR_ACCESS_TOKEN,
};

export default ENV;
