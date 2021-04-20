import { useSlateWithExtensions } from "@slate-extensions/core";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Editable, Slate } from "slate-react";
import { BalloonToolbar } from "../src";

describe("balloon-toolbar renders", () => {
  it("renders without crashing", async () => {
    const editorTestId = "balloon-toolbar-editor";
    const TestComponent = () => {
      const { getEditableProps, getSlateProps } = useSlateWithExtensions({
        "data-testid": editorTestId,
      });
      return (
        <Slate {...getSlateProps()}>
          <Editable {...getEditableProps()} />
          <BalloonToolbar>Balloon Content</BalloonToolbar>
        </Slate>
      );
    };
    render(<TestComponent />);
    await waitFor(() => screen.getByTestId(editorTestId));

    expect(screen.getByTestId(editorTestId)).toBeInTheDocument();
  });
});
