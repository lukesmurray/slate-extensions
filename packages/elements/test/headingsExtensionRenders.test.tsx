import { useSlateWithExtensions } from "@slate-extensions/core";
import React from "react";
import ReactDOM from "react-dom";
import { Editable, Slate } from "slate-react";
import {
  h1Type,
  h2Type,
  h3Type,
  h4Type,
  h5Type,
  h6Type,
  useHeadingsExtension,
} from "../src";

describe("headingsExtension Renders", () => {
  it("renders without crashing", () => {
    const TestComponent = () => {
      const { getEditableProps, getSlateProps } = useSlateWithExtensions({
        initialState: [
          { type: h1Type, children: [{ text: "This is an h1 heading" }] },
          { type: h2Type, children: [{ text: "This is an h2 heading" }] },
          { type: h3Type, children: [{ text: "This is an h3 heading" }] },
          { type: h4Type, children: [{ text: "This is an h4 heading" }] },
          { type: h5Type, children: [{ text: "This is an h5 heading" }] },
          { type: h6Type, children: [{ text: "This is an h6 heading" }] },
        ],
        extensions: [useHeadingsExtension()],
      });

      return (
        <Slate {...getSlateProps()}>
          <Editable {...getEditableProps()} />
        </Slate>
      );
    };
    const div = document.createElement("div");
    ReactDOM.render(<TestComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
