import React from "react";

export default class Carousel extends React.Component {
  state = {
    numberOfItemsToShow: 1,
    position: 0
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

  handlePrevious = () => {
    const currentPosition = this.state.position;
    const newPosition =
      currentPosition === 0 ? this.props.items.length - 1 : currentPosition - 1;
    this.setState({ position: newPosition });
  };

  handleNext = () => {
    const currentPosition = this.state.position;
    const newPosition =
      currentPosition === this.props.items.length ? 1 : currentPosition + 1;
    this.setState({ position: newPosition });
  };

  renderItem(item, isCurrent) {
    return (
      <li
        key={item.imgSrc}
        className={`carousel-item${isCurrent ? " current" : ""}`}>
        <img src={item.imgSrc} />
      </li>
    );
  }
  render() {
    const { items } = this.props;
    const { numberOfItemsToShow, position } = this.state;

    const startIndex = position;
    const endIndex = position + numberOfItemsToShow;
    const itemsToShow = [...items, ...items].slice(startIndex, endIndex);

    const currentIndex = Math.ceil(itemsToShow.length / 2);

    const content = itemsToShow.map((item, i) =>
      this.renderItem(item, i + 1 === currentIndex)
    );

    return (
      <>
        <ul className="carousel">{content}</ul>
        <ul className="controls">
          <li>
            <button className="previous" onClick={this.handlePrevious}>
              Previous
            </button>
          </li>
          <li>
            <button className="next" onClick={this.handleNext}>
              Next
            </button>
          </li>
        </ul>
      </>
    );
  }
}
