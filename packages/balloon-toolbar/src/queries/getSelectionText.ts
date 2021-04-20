import { Editor } from "slate";

export const getSelectionText = (editor: Editor) => {
  const { selection } = editor;
  if (selection === null) {
    return "";
  } else {
    return Editor.string(editor, selection);
  }
};
