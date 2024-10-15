import {
  array,
  nonEmptyString,
  number,
  object,
  optional,
  record,
  string,
  unknown,
  type Decoder,
} from "decoders";
import { getErrorLog as getStoredErrorLog, setErrorLog } from "~/storage";

export const ERROR_LOG_MAX_LENGTH = 50;

interface ErrorLogEntry {
  level: string;
  message: string;
  timestamp: number;
  uuid: string;
  properties?: Record<string, unknown>;
}

const errorLogDecoder: Decoder<ErrorLogEntry[]> = array(
  object({
    level: nonEmptyString,
    message: string,
    timestamp: number,
    uuid: string,
    properties: optional(record(unknown)),
  }),
);

export const getErrorLog = async () => {
  const storedErrorLog = await getStoredErrorLog();

  return errorLogDecoder.value(storedErrorLog) ?? [];
};

export const appendErrorLogEntry = async (entry: ErrorLogEntry) => {
  const oldErrorLog = await getErrorLog();

  const newErrorLog = [entry, ...oldErrorLog].slice(0, ERROR_LOG_MAX_LENGTH);

  return setErrorLog(newErrorLog);
};
