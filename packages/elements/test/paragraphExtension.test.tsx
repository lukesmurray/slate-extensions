/** @jsx jsx */
import { useSlateWithExtensions } from "@slate-extensions/core";
import { act, renderHook } from "@testing-library/react-hooks";
import { Editor } from "slate";
import { useParagraphExtension } from "../src";
import { jsx } from "./jsx";

describe("paragraphExtension ", () => {
  it("basic input works", () => {
    const input = (
      <editor>
        <p>
          hello
          <cursor />
        </p>
      </editor>
    ) as Editor;

    const output = (
      <editor>
        <p>
          hello world
          <cursor />
        </p>
      </editor>
    ) as Editor;

    const { result } = renderHook(() => {
      return useSlateWithExtensions({
        editor: input,
        extensions: [useParagraphExtension()],
      });
    });

    act(() => {
      result.current.editor.insertText(" world");
    });

    expect(input.children).toEqual(output.children);
    expect(input.selection).toEqual(output.selection);
  });
});
