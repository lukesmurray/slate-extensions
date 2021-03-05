import { Ancestor, Editor } from "slate";
import { EditorAboveOptions } from "..";

export const getBlockAbove = <T extends Ancestor>(
  editor: Editor,
  options?: EditorAboveOptions
) => {
  const blockAboveEntry = Editor.above<T>(editor, {
    ...options,
    match: (node, path) =>
      (options?.match?.(node, path) ?? true) && Editor.isBlock(editor, node),
  });

  // there should never be a case where the block above is undefined
  if (blockAboveEntry === undefined) {
    console.error("invalid slate state expected block above to be defined");
    console.error("Editor Selection");
    console.error(JSON.stringify(editor.selection, null, 2));
    console.error("Editor Children");
    console.error(JSON.stringify(editor.children, null, 2));
    throw new Error(
      "invalid slate state expected block above to be defined. Check console for more details."
    );
  }
  return blockAboveEntry;
};
