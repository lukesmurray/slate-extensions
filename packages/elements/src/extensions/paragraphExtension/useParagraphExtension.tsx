import { SlateExtension } from "@slate-extensions/common";
import React from "react";

export const useParagraphExtension = (): SlateExtension => {
  return {
    renderElement: props => {
      if (props.element.type === "p") {
        return <p {...props.attributes}>{props.children}</p>;
      }
      return undefined;
    },
  };
};
