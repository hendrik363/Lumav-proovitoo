import Cart from "./components/Cart/Cart";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./default.scss"

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
