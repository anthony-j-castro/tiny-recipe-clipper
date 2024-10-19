import { v4 as uuidv4 } from "uuid";
import config from "~/config";
import { appendErrorLogEntry } from "~/utils/error-log";
import getUserId from "~/utils/getUserId";

export type SeverityLevel = "critical" | "debug" | "error" | "info" | "warning";
type Properties = Record<string, unknown>;

const sendItem = async ({
  level,
  message,
  properties,
}: {
  level: SeverityLevel;
  message: string;
  properties?: Properties;
}) => {
  if (!config.ROLLBAR_ACCESS_TOKEN) {
    return;
  }

  const userId = await getUserId();

  const timestamp = Math.floor(Date.now() / 1000);
  const uuid = uuidv4();

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
            ...properties,
            body: message,
          },
        },
        person: {
          id: userId,
        },
        code_version: config.VERSION,
        environment: config.ENVIRONMENT,
        language: "javascript",
        level,
        platform: "browser",
        timestamp,
        uuid,
      },
    }),
  });

  await appendErrorLogEntry({
    level,
    message,
    timestamp: timestamp * 1000,
    uuid,
    properties,
  });

  return response.json();
};

const sendError = (message: string, properties?: Properties) =>
  sendItem({ level: "error", message, properties });

const sendInfo = (message: string, properties?: Properties) =>
  sendItem({ level: "info", message, properties });

export default {
  error: sendError,
  info: sendInfo,
};
