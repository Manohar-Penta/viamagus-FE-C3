import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { IntlProvider } from "react-intl";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntlProvider locale="en">
      <App />
    </IntlProvider>
  </StrictMode>
);
