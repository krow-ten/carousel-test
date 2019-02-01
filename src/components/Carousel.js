import React from "react";

export default class Carousel extends React.Component {
  state = {
    numberOfItemsToShow: 1
  };

  handleResize = () => {
    const widthOfImages = 300;
    let numberOfItemsToShow = Math.floor(window.innerWidth / widthOfImages);
    this.setState({
      numberOfItemsToShow
    });
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  renderItem(item) {
    return (
      <li key={item.imgSrc} className={`carousel-item`}>
        <img src={item.imgSrc} />
      </li>
    );
  }
  render() {
    const { items } = this.props;
    const { numberOfItemsToShow } = this.state;
    const itemsToShow = items.slice(0, numberOfItemsToShow);
    const content = itemsToShow.map(this.renderItem);
    return <ul className="carousel">{content}</ul>;
  }
}
