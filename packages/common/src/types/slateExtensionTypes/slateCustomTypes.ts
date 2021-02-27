declare module "slate" {
  // declare interfaces for each of the types that are often joined together
  // the keys of this interface are unioned together internally to create the
  // final custom type
  export interface CustomRange {
    Default: { type?: undefined };
  }

  /**
   * Use this interface to create custom elements
   * For example in a paragraph plugin you can specify an element with `type: p`
   * as follows.
   * The keys of this interface must be unique. (You'll get a type error if
   * they are not unless the type you specify matches the type already
   * associated with that key)
   *
   * declare module "slate" {
   *   export interface CustomElement {
   *     Paragraph: { type: "p" }
   *   }
   * }
   *
   */
  export interface CustomElement {
    Default: { type?: undefined };
  }

  export interface CustomText {
    Default: { type?: undefined };
  }
}

// merge all declarations together
declare module "slate" {
  export interface CustomTypes {
    Element: CustomElement[keyof CustomElement];
    Range: CustomRange[keyof CustomRange];
    Text: CustomText[keyof CustomText];
  }
}

export {};
