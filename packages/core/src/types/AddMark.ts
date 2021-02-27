import { Next } from "@slate-extensions/common";
import { Editor } from "slate";

/**
 * Function called whenever a mark is added in the editor.
 * Use next to call the next addMark handler.
 */
export type AddMark = (
  key: string,
  value: any,
  editor: Editor,
  next: Next<AddMark>
) => void;
