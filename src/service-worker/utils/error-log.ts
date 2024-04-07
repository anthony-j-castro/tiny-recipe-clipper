import {
  Decoder,
  array,
  exact,
  nonEmptyString,
  number,
  optional,
  record,
  string,
  unknown,
} from "decoders";
import { getErrorLog as getStoredErrorLog, setErrorLog } from "~/storage";

type ErrorLogEntry = {
  level: string;
  message: string;
  timestamp: number;
  uuid: string;
  properties?: Record<string, unknown>;
};

const errorLogDecoder: Decoder<Array<ErrorLogEntry>> = array(
  exact({
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

  const newErrorLog = [entry, ...oldErrorLog].slice(0, 50);

  return setErrorLog(newErrorLog);
};
