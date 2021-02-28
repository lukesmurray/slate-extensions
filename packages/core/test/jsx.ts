import { createHyperscript } from "slate-hyperscript";

// This allows tests to include Slate Nodes written in JSX without TypeScript complaining.
declare global {
  namespace jsx.JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [elemName: string]: any;
    }
  }
}

export const jsx = createHyperscript();
