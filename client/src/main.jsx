import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
     <Provider store={store}>
        <App />
        <ToastContainer position="top-center" autoClose={5000} /> 
     </Provider>
  </BrowserRouter>
);
