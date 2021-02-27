import { Next } from "@slate-extensions/common";
import { Editor, NodeEntry } from "slate";

/**
 * Function called whenever normalization occurs in the editor.
 * Use next to call the next normalizeNode handler.
 */
export type NormalizeNode = (
  entry: NodeEntry,
  editor: Editor,
  next: Next<NormalizeNode>
) => void;
