/// <reference types="node" />

const ENV = {
  BUILD_ENV: import.meta.env.VITE_BUILD_ENV,
  ROLLBAR_ACCESS_TOKEN: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
};

export default ENV;
