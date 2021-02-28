import { createHyperscript } from "slate-hyperscript";
import {
  h1Type,
  h2Type,
  h3Type,
  h4Type,
  h5Type,
  h6Type,
  paragraphType,
} from "../src";

// This allows tests to include Slate Nodes written in JSX without TypeScript complaining.
declare global {
  namespace jsx.JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [elemName: string]: any;
    }
  }
}

export const jsx = createHyperscript({
  elements: {
    p: { type: paragraphType },
    h1: { type: h1Type },
    h2: { type: h2Type },
    h3: { type: h3Type },
    h4: { type: h4Type },
    h5: { type: h5Type },
    h6: { type: h6Type },
  },
});
