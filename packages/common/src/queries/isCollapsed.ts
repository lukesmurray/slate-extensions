import { Range } from "slate";
import { isDefined } from "..";

/**
 * Return whether the range is collapsed (the anchor and focus are the same).
 * Return false if `range` is not defined.
 */
export const isCollapsed = (range?: Range | null): range is Range =>
  isDefined(range) && Range.isCollapsed(range);
