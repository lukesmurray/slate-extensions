import {
  listItemType,
  orderedListType,
  taskListType,
  unorderedListType,
} from ".";
import { taskListListItemType } from "./elementTypes";

// custom types for the paragraph plugin
declare module "slate" {
  export interface CustomElement {
    orderList: { type: typeof orderedListType };
    unorderedList: { type: typeof unorderedListType };
    taskList: { type: typeof taskListType };
    listItem: { type: typeof listItemType };
    taskListItem: { type: typeof taskListListItemType; checked: boolean };
  }
}

export {};
