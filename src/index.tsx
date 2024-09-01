import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown";
import { Provider } from "react-redux";
import { store } from "./common/store/store";
import Toastify from "./common/Toastify";
import Loading from "./common/Loading";
import MessageModal from "./common/MessageModal";

declare module "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
    <Toastify />
  </Provider>
);
