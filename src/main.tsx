import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App.tsx";
import "./styles/index.css";

console.log(window.location.origin);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Auth0Provider
    domain="dev-cra0zttj8xlwi6sh.us.auth0.com"
    clientId="8bc0qUmibSf3yVXzq0ovLQaDLoSGqZTW"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);
