import { Next } from "@slate-extensions/common";
import { Editor } from "slate";

/**
 * Function called whenever the editor inserts a break.
 * Use next to call the next insertBreak handler.
 */
export type InsertBreak = (editor: Editor, next: Next<InsertBreak>) => void;
