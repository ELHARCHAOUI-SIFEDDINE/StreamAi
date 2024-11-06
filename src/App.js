import { Provider } from "react-redux";
import Main from "./Components/Main";
import store from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
