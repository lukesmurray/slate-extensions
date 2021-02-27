import { Next } from "@slate-extensions/common";
import { Descendant, Editor } from "slate";

/**
 * Function called whenever get fragment occurs in the editor.
 * Use next to call the next getFragment handler.
 */
export type GetFragment = (
  editor: Editor,
  next: Next<GetFragment>
) => Descendant[];
