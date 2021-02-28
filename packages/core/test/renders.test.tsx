import * as React from "react";
import * as ReactDOM from "react-dom";
import { Editable, Slate } from "slate-react";
import { useSlateWithExtensions } from "../src";

describe("useSlateWithExtensions Renders", () => {
  it("renders without crashing", () => {
    const TestComponent = () => {
      const { getEditableProps, getSlateProps } = useSlateWithExtensions();
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
