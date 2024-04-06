import { v4 as uuidv4 } from "uuid";
import config from "~/config";
import getUserId from "~/utils/getUserId";

export type SeverityLevel = "critical" | "debug" | "error" | "info" | "warning";
type Properties = Record<string, unknown>;

async function sendItem({
  level,
  message,
  properties,
}: {
  level: SeverityLevel;
  message: string;
  properties?: Properties;
}) {
  if (!config.ROLLBAR_ACCESS_TOKEN) {
    return;
  }

  const userId = await getUserId();

  const response = await fetch("https://api.rollbar.com/api/1/item/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Rollbar-Access-Token": config.ROLLBAR_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      data: {
        body: {
          message: {
            body: message,
          },
        },
        person: {
          id: userId,
        },
        code_version: config.VERSION,
        custom: properties,
        environment: config.ENVIRONMENT,
        language: "javascript",
        level,
        platform: "client",
        timestamp: Math.floor(Date.now() / 1000),
        uuid: uuidv4(),
      },
    }),
  });

  return response.json();
}

function sendError(message: string, properties?: Properties) {
  return sendItem({ level: "error", message, properties });
}

function sendInfo(message: string, properties?: Properties) {
  return sendItem({ level: "info", message, properties });
}

export default {
  error: sendError,
  info: sendInfo,
};
