import { Next } from "@slate-extensions/common";
import { Editor, Operation } from "slate";

/**
 * Function called whenever an operation is applied in the editor.
 * Use next to call the next apply handler.
 */
export type Apply = (
  operation: Operation,
  editor: Editor,
  next: Next<Apply>
) => void;
