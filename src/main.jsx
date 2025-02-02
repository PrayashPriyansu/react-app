import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyles />
    <React.StrictMode>
      <ErrorBoundary
        onReset={() => window.location.replace("/")}
        FallbackComponent={ErrorFallback}
      >
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  </>
);
