import { Element } from "slate";
import { orderedListType, taskListType, unorderedListType } from "..";

const listTypes = new Set([orderedListType, unorderedListType, taskListType]);

export const isListElement = (value: any) =>
  Element.isElement(value) && listTypes.has(value.type as any);
