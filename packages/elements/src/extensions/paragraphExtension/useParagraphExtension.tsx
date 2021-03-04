import { SlateExtension } from "@slate-extensions/common";
import React from "react";
import { paragraphType } from ".";

export const useParagraphExtension = (): SlateExtension => {
  return {
    renderElement: props => {
      const { element } = props;
      if (element.type === paragraphType) {
        return <p {...props.attributes}>{props.children}</p>;
      }
      return undefined;
    },
  };
};
