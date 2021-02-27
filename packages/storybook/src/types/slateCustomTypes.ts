// custom types for the highlighting example
declare module "slate" {
  export interface CustomRange {
    Range: { type: "highlight" };
  }
  export interface CustomText {
    Text: { type: "highlight" };
  }
}

// custom types for the mention example
declare module "slate" {
  export interface CustomElement {
    Mention: { type: "mention"; character: string };
  }
}

export {};
