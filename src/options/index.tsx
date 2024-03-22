import React from "react";
import ReactDOM from "react-dom/client";
import config from "~/config";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <div>From options: Hello World! {config.WEB_APP.HOSTNAME}</div>
  </React.StrictMode>,
);
