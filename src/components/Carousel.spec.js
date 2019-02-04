import React from "react";
import Carousel from "./Carousel";

import { shallow, mount } from "enzyme";

describe("Carousel", () => {
  const items = [
    { imgSrc: "imgsrc1" },
    { imgSrc: "imgsrc2" },
    { imgSrc: "imgsrc3" },
    { imgSrc: "imgsrc4" },
    { imgSrc: "imgsrc5" },
    { imgSrc: "imgsrc6" },
    { imgSrc: "imgsrc7" }
  ];

  const defaultGlobalInnerWidth = global.innerWidth;

  beforeEach(() => {
    global.innerWidth = defaultGlobalInnerWidth;
  });

  it("should render", () => {
    const component = shallow(<Carousel items={items} />);
    expect(component.exists()).toBe(true);
  });

  it("should show items passed into it", () => {
    const component = shallow(<Carousel items={items} />);
    const images = component.find(".carousel-item img");
    expect(images.first().prop("src")).toEqual("imgsrc1");
    expect(images.at(1).prop("src")).toEqual("imgsrc2");
  });

  it("should show only 1 of the items when only one 300px image would fit", () => {
    global.innerWidth = 400;
    const component = shallow(<Carousel items={items} />);
    expect(component.find(".carousel-item").length).toBe(1);
  });

  it("should show only 2 of the items when only two 300px images would fit", () => {
    global.innerWidth = 700;
    const component = shallow(<Carousel items={items} />);
    expect(component.find(".carousel-item").length).toBe(2);
  });

  it("should show only 3 of the items when only three 300px images would fit", () => {
    global.innerWidth = 1024;
    const component = shallow(<Carousel items={items} />);
    expect(component.find(".carousel-item").length).toBe(3);
  });

  it("should show only 5 of the items when five 300px images could fit", () => {
    global.innerWidth = 1680;
    const component = shallow(<Carousel items={items} />);
    expect(component.find(".carousel-item").length).toBe(5);
  });

  it("should respond to resize event", () => {
    const component = shallow(<Carousel items={items} />);
    expect(component.find(".carousel-item").length).toBe(3);
    const resizeEvent = document.createEvent("Event");
    resizeEvent.initEvent("resize", true, true);
    global.window.innerWidth = 400;
    global.window.dispatchEvent(resizeEvent);
    expect(component.find(".carousel-item").length).toBe(1);
  });

  it("should make next image the current image when next button clicked", () => {
    global.innerWidth = 400;
    const component = shallow(<Carousel items={items} />);
    expect(component.find(".carousel-item.current img").prop("src")).toEqual(
      "imgsrc1"
    );
    component.find(".next-btn").simulate("click");
    expect(component.find(".carousel-item.current img").prop("src")).toEqual(
      "imgsrc2"
    );
  });

  it("should show the middle image as current when showing more than 1 image", () => {
    global.innerWidth = 1680;
    const component = shallow(<Carousel items={items} />);
    expect(component.find(".carousel-item.current img").prop("src")).toEqual(
      "imgsrc3"
    );
    component.find(".next-btn").simulate("click");
    expect(component.find(".carousel-item.current img").prop("src")).toEqual(
      "imgsrc4"
    );
  });

  it("should loop round images when hitting next", () => {
    global.innerWidth = 1680;
    const component = shallow(<Carousel items={items} />);
    expect(
      component
        .find(".carousel-item img")
        .last()
        .prop("src")
    ).toEqual("imgsrc5");

    const clickNextAndExpectLastImageSrcToBe = imgSrcValue => {
      component.find(".next-btn").simulate("click");
      expect(
        component
          .find(".carousel-item img")
          .last()
          .prop("src")
      ).toEqual(imgSrcValue);
    };

    clickNextAndExpectLastImageSrcToBe("imgsrc6");
    clickNextAndExpectLastImageSrcToBe("imgsrc7");
    clickNextAndExpectLastImageSrcToBe("imgsrc1");
    clickNextAndExpectLastImageSrcToBe("imgsrc2");
  });

  it("should loop in reverse images when hitting previous", () => {
    global.innerWidth = 1680;
    const component = shallow(<Carousel items={items} />);
    expect(
      component
        .find(".carousel-item img")
        .first()
        .prop("src")
    ).toEqual("imgsrc1");

    const clickPreviousAndExpectLastImageSrcToBe = imgSrcValue => {
      component.find(".previous-btn").simulate("click");
      expect(
        component
          .find(".carousel-item img")
          .first()
          .prop("src")
      ).toEqual(imgSrcValue);
    };

    clickPreviousAndExpectLastImageSrcToBe("imgsrc7");
    clickPreviousAndExpectLastImageSrcToBe("imgsrc6");
    clickPreviousAndExpectLastImageSrcToBe("imgsrc5");
  });
});
