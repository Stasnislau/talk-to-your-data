import React from "react";
import { createContext } from "react";
import Store from "./store";
import MainPage from "./pages";
import WrapperComponent from "./components/wrapper";
const store = new Store();
export const Context = createContext(store);

function App() {
  return (
    <div className="App">
      <Context.Provider value={store}>
        <WrapperComponent>
          <MainPage />
        </WrapperComponent>
      </Context.Provider>
    </div>
  );
}

export default App;
