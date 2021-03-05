import { Editor } from "slate";
import { Next } from "..";

/**
 * Function called whenever the editor inserts data.
 * Use next to call the next insertText handler.
 */
export type InsertData = (
  data: DataTransfer,
  editor: Editor,
  next: Next<InsertData>
) => void;
