import { Decoder, constant, exact, uuidv4 } from "decoders";
import { PingMessage, ReceivableServiceWorkerMessage } from "~/messages/types";

const pingMessageDecoder: Decoder<PingMessage> = exact({
  sender: constant("web-app"),
  type: constant("PING"),
  payload: exact({
    userId: uuidv4,
  }),
});

export const receivableServiceWorkerMessageDecoder: Decoder<ReceivableServiceWorkerMessage> =
  pingMessageDecoder;
