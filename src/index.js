import React from "react";
import ReactDOM from "react-dom";

import "./index.less";

import Carousel from "./components/Carousel";

const App = () => {
  const isDesktop = document.documentElement.clientWidth > 786;
  const numberOfItemsToShow = isDesktop ? 5 : 1;
  return (
    <div className="app">
      <Carousel
        items={[
          { imgSrc: "https://picsum.photos/300/?image=0" },
          { imgSrc: "https://picsum.photos/300/?image=1" },
          { imgSrc: "https://picsum.photos/300/?image=2" },
          { imgSrc: "https://picsum.photos/300/?image=3" },
          { imgSrc: "https://picsum.photos/300/?image=4" },
          { imgSrc: "https://picsum.photos/300/?image=5" },
          { imgSrc: "https://picsum.photos/300/?image=6" },
          { imgSrc: "https://picsum.photos/300/?image=7" },
          { imgSrc: "https://picsum.photos/300/?image=8" },
          { imgSrc: "https://picsum.photos/300/?image=9" },
          { imgSrc: "https://picsum.photos/300/?image=10" },
          { imgSrc: "https://picsum.photos/300/?image=11" }
        ]}
        numberOfItemsToShow={numberOfItemsToShow}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
