import { Editor, Range } from "slate";

export const isSelectionExpanded = (editor: Editor) =>
  editor.selection !== null && Range.isExpanded(editor.selection);
