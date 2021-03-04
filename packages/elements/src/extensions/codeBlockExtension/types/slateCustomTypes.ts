import { codeBlockType } from "./elementTypes";

// custom types for the paragraph plugin
declare module "slate" {
  export interface CustomElement {
    codeBlock: { type: typeof codeBlockType };
  }
}

export {};
