import { useEffect, useState } from "react";
import { Editor } from "slate";
import { getSelectionText, isSelectionExpanded } from "../queries";

export const useBalloonShow = (editor: Editor) => {
  const [hidden, setHidden] = useState(true);

  const selectionExpanded = isSelectionExpanded(editor);
  const selectionText = getSelectionText(editor);

  useEffect(() => {
    if (selectionExpanded && hidden) {
      setHidden(false);
    }
  }, [hidden, selectionExpanded]);

  useEffect(() => {
    if (!hidden && !selectionExpanded) {
      setHidden(true);
    }
  }, [hidden, selectionExpanded]);

  return !hidden;
};
