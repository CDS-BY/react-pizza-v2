import Header from "./components/Header";

import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import { useState, createContext } from "react";

export const SearchContext = createContext("");

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="App">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="wrapper">
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
