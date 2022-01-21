import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import store, { persistor } from "./app/store";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
