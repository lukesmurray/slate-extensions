import { hrType } from "./elementTypes";

// custom types for the paragraph plugin
declare module "slate" {
  export interface CustomElement {
    hr: { type: typeof hrType };
  }
}

export {};
