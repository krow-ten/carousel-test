import React from "react";
import ReactDOM from "react-dom";

import "./index.less";

import Carousel from "./components/Carousel";

const NUMBER_OF_IMAGES_TO_LOAD = 12;

class App extends React.Component {
  state = {
    items: null,
    error: null
  };

  componentDidMount() {
    fetch("https://picsum.photos/list")
      .then(response =>
        response
          .json()
          .then(data => {
            const items = data
              .map(image => ({
                imgSrc: `https://picsum.photos/300/?image=${image.id}`,
                title: image.filename
              }))
              .slice(0, NUMBER_OF_IMAGES_TO_LOAD);
            this.setState({ items });
          })
          .catch(error => this.setState({ error }))
      )
      .catch(error => this.setState({ error }));
  }

  render() {
    const { items, error } = this.state;
    return (
      <div className="app">
        <section className="header">
          <h1>Carousel Test</h1>
        </section>
        <section className="main-container">
          {items ? <Carousel items={items} /> : <span>Loading...</span>}
          {error && (
            <span className="error">
              There was a problem fetching list of images
            </span>
          )}
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
