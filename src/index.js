import React from "react";
import ReactDOM from "react-dom";

import "./index.less";

import Carousel from "./components/Carousel";

const App = () => {
  return (
    <div className="app">
      <Carousel />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
