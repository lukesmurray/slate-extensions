import { getBlockAbove } from "@slate-extensions/common";
import { Editor, Element, Transforms } from "slate";

export const setBlockTypeInputCommand = (type: Element["type"]) => (
  editor: Editor
): false => {
  // get the block above
  const blockAbove = getBlockAbove(editor);
  // set the block's type
  Transforms.setNodes(
    editor,
    { type },
    {
      match: node => Editor.isBlock(editor, node),
    }
  );
  // replace the block's text
  Transforms.insertText(editor, "", {
    at: blockAbove[1],
  });
  return false;
};
