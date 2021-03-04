import { SlateExtension } from "@slate-extensions/common";
import React from "react";
import { codeBlockType } from "./types";

export const useCodeBlockExtension = (): SlateExtension => {
  return {
    renderElement: props => {
      if (props.element.type === codeBlockType) {
        return (
          <pre {...props.attributes}>
            <code>{props.children}</code>
          </pre>
        );
      }
      return undefined;
    },
  };
};
