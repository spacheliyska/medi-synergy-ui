import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root");
if (domNode) {
  const root = createRoot(domNode);

  root.render(
    <React.StrictMode>
      <App></App>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
