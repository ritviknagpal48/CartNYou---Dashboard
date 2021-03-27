// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";
import "./tailwind.output.css";
import "antd/dist/antd.css";
import { AuthContextProvider } from "Contexts/Auth";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
