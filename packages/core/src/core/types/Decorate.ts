import { Editor, NodeEntry, Range } from "slate";

/**
 * Function used to decorate ranges.
 * If the function returns undefined then no ranges are modified.
 * If the function returns an array the returned ranges are merged with the ranges called by other extensions.
 */
export type Decorate = (
  entry: NodeEntry,
  editor: Editor
) => Range[] | undefined;
