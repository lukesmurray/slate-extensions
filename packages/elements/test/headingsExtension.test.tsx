/** @jsx jsx */
import { useSlateWithExtensions } from "@slate-extensions/core";
import { act, renderHook } from "@testing-library/react-hooks";
import { Editor } from "slate";
import { useHeadingsExtension } from "../src";
import { jsx } from "./jsx";

describe("headingsExtension", () => {
  it("basic input works", () => {
    const input = (
      <editor>
        <h1>
          hello
          <cursor />
        </h1>
      </editor>
    ) as Editor;

    const output = (
      <editor>
        <h1>
          hello world
          <cursor />
        </h1>
      </editor>
    ) as Editor;

    const { result } = renderHook(() => {
      return useSlateWithExtensions({
        editor: input,
        extensions: [useHeadingsExtension()],
      });
    });

    act(() => {
      result.current.editor.insertText(" world");
    });

    expect(input.children).toEqual(output.children);
    expect(input.selection).toEqual(output.selection);
  });
});
