import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Editable, Slate } from "slate-react";
import { useSlateWithExtensions } from "../src";

describe("useSlateWithExtensions renders", () => {
  it("renders without crashing", async () => {
    const editorTestId = "slate-editor";
    const TestComponent = () => {
      const { getEditableProps, getSlateProps } = useSlateWithExtensions({
        "data-testid": editorTestId,
      });
      return (
        <Slate {...getSlateProps()}>
          <Editable {...getEditableProps()} />
        </Slate>
      );
    };
    render(<TestComponent />);

    await waitFor(() => screen.getByTestId(editorTestId));

    expect(screen.getByTestId(editorTestId)).toBeInTheDocument();
  });
});
