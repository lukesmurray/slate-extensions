import { Next } from "@slate-extensions/common";
import { Editor } from "slate";

/**
 * Function called whenever delete fragment occurs in the editor.
 * Use next to call the next deleteFragment handler.
 */
export type DeleteFragment = (
  editor: Editor,
  next: Next<DeleteFragment>
) => void;
