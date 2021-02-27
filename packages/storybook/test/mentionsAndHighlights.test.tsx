import React from "react";
import * as ReactDOM from "react-dom";
import { MentionsAndHighlights } from "../src";

describe("MentionsAndHighlights", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<MentionsAndHighlights />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
