import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>,
);
