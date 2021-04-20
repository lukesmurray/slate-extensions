import { useMemo } from "react";
import { Editor } from "slate";
import { isSelectionExpanded } from "../queries";

export const useBalloonShow = (editor: Editor) => {
  const selectionExpanded = isSelectionExpanded(editor);

  return useMemo(() => selectionExpanded, [selectionExpanded]);
};
