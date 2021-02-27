import { Next } from "@slate-extensions/common";
import { Editor, Node } from "slate";

/**
 * Function called whenever insert fragment occurs in the editor.
 * Use next to call the next insertFragment handler.
 */
export type InsertFragment = (
  fragment: Node[],
  editor: Editor,
  next: Next<InsertFragment>
) => void;
