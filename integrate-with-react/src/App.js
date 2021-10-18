import "./App.css";
import Bugs from "./components/Bugs";
import BugsHooks from "./components/BugsHooks";
import configureStore from "./store/configureStore";
// import StoreContext from "./context/storeContext";
import { Provider } from "react-redux";

const store = configureStore();
// We don't need context now because we're using react-redux
function App() {
  return (
    <Provider store={store}>
      <BugsHooks />
    </Provider>
  );
}

export default App;
