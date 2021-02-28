import { h1Type, h2Type, h3Type, h4Type, h5Type, h6Type } from ".";

// custom types for the paragraph plugin
declare module "slate" {
  export interface CustomElement {
    h1: { type: typeof h1Type };
    h2: { type: typeof h2Type };
    h3: { type: typeof h3Type };
    h4: { type: typeof h4Type };
    h5: { type: typeof h5Type };
    h6: { type: typeof h6Type };
  }
}

export {};
