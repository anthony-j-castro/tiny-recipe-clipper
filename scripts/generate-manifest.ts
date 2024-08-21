/* eslint-disable no-restricted-imports */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import * as prettier from "prettier";
import packageJson from "../package.json";
import baseManifest from "../src/base-manifest";

const __dirname = dirname(fileURLToPath(import.meta.url));

const main = async () => {
  const manifest = { ...baseManifest };
  manifest.version = packageJson.version;

  if (process.env.GITHUB_SHA && process.env.PUBLISH !== "true") {
    const shortSha = process.env.GITHUB_SHA.substring(0, 7);
    manifest.version_name = `${manifest.version}-${shortSha}`;
  } else {
    delete manifest.version_name;
  }

  const prettierOptions = await prettier.resolveConfig(
    path.resolve(__dirname, "placeholder.json"),
    {
      config: path.resolve(__dirname, "../.prettierrc.json"),
    },
  );

  const formattedManifestContent = await prettier.format(
    JSON.stringify(manifest, null, 2),
    { ...(prettierOptions ?? undefined), parser: "json" },
  );

  fs.writeFileSync(
    path.resolve(__dirname, "../src/manifest.json"),
    formattedManifestContent,
  );
};

main();
