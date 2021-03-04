import { gapCursorType } from "./elementTypes";

// custom types for the paragraph plugin
declare module "slate" {
  export interface CustomElement {
    gapCursor: { type: typeof gapCursorType };
  }
}

export {};
