import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import {
  MentionsAndHighlights,
  mentionsAndHighlightsEditorTestId,
} from "../src";

describe("MentionsAndHighlights", () => {
  it("renders without crashing", async () => {
    render(<MentionsAndHighlights />);

    await waitFor(() => screen.getByTestId(mentionsAndHighlightsEditorTestId));

    expect(
      screen.getByTestId(mentionsAndHighlightsEditorTestId)
    ).toBeInTheDocument();
  });
});
