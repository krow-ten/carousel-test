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
    { imgSrc: "imgsrc6" }
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
    const images = component.find("li img");
    expect(images.first().prop("src")).toEqual("imgsrc1");
    expect(images.at(1).prop("src")).toEqual("imgsrc2");
  });

  it("should show only 1 of the items when only one 300px image would fit", () => {
    global.innerWidth = 400;
    const component = shallow(<Carousel items={items} />);
    expect(component.find("li").length).toBe(1);
  });

  it("should show only 2 of the items when only two 300px images would fit", () => {
    global.innerWidth = 700;
    const component = shallow(<Carousel items={items} />);
    expect(component.find("li").length).toBe(2);
  });

  it("should show only 3 of the items when only three 300px images would fit", () => {
    global.innerWidth = 1024;
    const component = shallow(<Carousel items={items} />);
    expect(component.find("li").length).toBe(3);
  });

  it("should show only 5 of the items when five 300px images could fit", () => {
    global.innerWidth = 1680;
    const component = shallow(<Carousel items={items} />);
    expect(component.find("li").length).toBe(5);
  });

  it("should respond to resize event", () => {
    const component = shallow(<Carousel items={items} />);
    expect(component.find("li").length).toBe(3);
    const resizeEvent = document.createEvent("Event");
    resizeEvent.initEvent("resize", true, true);
    global.window.innerWidth = 400;
    global.window.dispatchEvent(resizeEvent);
    expect(component.find("li").length).toBe(1);
  });
});
