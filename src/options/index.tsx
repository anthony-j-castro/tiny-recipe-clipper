import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import config from "~/config";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <div>From options: Hello World! {config.WEB_APP.ORIGIN}</div>
  </StrictMode>,
);
