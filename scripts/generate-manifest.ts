/* eslint-disable no-restricted-imports */
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { format, resolveConfig } from "prettier";
import packageJson from "../package.json";
import baseManifest from "../src/base-manifest";

const main = async () => {
  const manifest = { ...baseManifest };
  manifest.version = packageJson.version;

  if (process.env.GITHUB_SHA && process.env.PUBLISH !== "true") {
    const shortSha = process.env.GITHUB_SHA.slice(0, 7);
    manifest.version_name = `${manifest.version}-${shortSha}`;
  } else {
    delete manifest.version_name;
  }

  const prettierOptions = await resolveConfig(
    path.resolve(import.meta.dirname, "placeholder.json"),
    {
      config: path.resolve(import.meta.dirname, "../.prettierrc.json"),
    },
  );

  const formattedManifestContent = await format(
    JSON.stringify(manifest, null, 2),
    { ...(prettierOptions ?? undefined), parser: "json" },
  );

  fs.writeFileSync(
    path.resolve(import.meta.dirname, "../src/manifest.json"),
    formattedManifestContent,
  );
};

main();
