import { useSlateWithExtensions } from "@slate-extensions/core";
import React from "react";
import ReactDOM from "react-dom";
import { Editable, Slate } from "slate-react";
import { paragraphType, useParagraphExtension } from "../src";

describe("paragraphExtension Renders", () => {
  it("renders without crashing", () => {
    const TestComponent = () => {
      const { getEditableProps, getSlateProps } = useSlateWithExtensions({
        extensions: [useParagraphExtension()],
        initialState: [
          {
            type: paragraphType,
            children: [{ text: "this is a paragraph element" }],
          },
        ],
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
