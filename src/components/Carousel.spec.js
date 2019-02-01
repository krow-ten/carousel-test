import React from "react";
import { shallow } from "enzyme";

import Carousel from "./Carousel";

describe("Carousel", () => {
  it("should render", () => {
    const component = shallow(<Carousel />);
    expect(component.exists()).toBe(true);
  });
});
