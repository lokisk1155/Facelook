import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/Modal";
import { Provider } from "react-redux";
import { restoreSession } from "./store/session";
import configureStore from "./store";
import csrfFetch from "./store/csrf";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

const renderApplication = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
};

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  store.dispatch(restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
