import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { IntlProvider } from "react-intl";

createRoot(document.getElementById("root")!).render(
  <IntlProvider locale="en-IN">
    <App />
  </IntlProvider>
);
