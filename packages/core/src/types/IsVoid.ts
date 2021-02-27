import { Next } from "@slate-extensions/common";
import { Editor, Element } from "slate";

/**
 * Function used to determine if an element is a void element.
 * Use next to call the next isVoid handler.
 */
export type IsVoid = (
  element: Element,
  editor: Editor,
  next: Next<IsVoid>
) => boolean;
