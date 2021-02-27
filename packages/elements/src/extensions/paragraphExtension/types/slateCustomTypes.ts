// custom types for the paragraph plugin
declare module "slate" {
  export interface CustomElement {
    Paragraph: { type: "p" };
  }
}

export {};
