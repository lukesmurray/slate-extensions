import { paragraphType } from ".";

// custom types for the paragraph plugin
declare module "slate" {
  export interface CustomElement {
    paragraph: { type: typeof paragraphType };
  }
}

export {};
