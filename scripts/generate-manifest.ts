/* eslint-disable no-restricted-imports */
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { format, resolveConfig } from "prettier";
import packageJson from "../package.json";
import baseManifest from "../src/base-manifest";

const PLACEHOLDER_PATH = path.resolve(import.meta.dirname, "placeholder.json");
const PRETTIER_CONFIG_PATH = path.resolve(
  import.meta.dirname,
  "../.prettierrc.json",
);
const MANIFEST_PATH = path.resolve(import.meta.dirname, "../src/manifest.json");

const main = async () => {
  const manifest = { ...baseManifest };
  manifest.version = packageJson.version;

  if (process.env.GITHUB_SHA && process.env.PUBLISH !== "true") {
    const shortSha = process.env.GITHUB_SHA.slice(0, 7);
    manifest.version_name = `${manifest.version}-${shortSha}`;
  } else {
    delete manifest.version_name;
  }

  const prettierOptions = await resolveConfig(PLACEHOLDER_PATH, {
    config: PRETTIER_CONFIG_PATH,
  });

  const formattedManifestContent = await format(
    JSON.stringify(manifest, null, 2),
    { ...(prettierOptions ?? undefined), parser: "json" },
  );

  fs.writeFileSync(MANIFEST_PATH, formattedManifestContent);
};

main();
