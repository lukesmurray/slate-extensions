import { SlateExtension } from "@slate-extensions/common";
import React from "react";
import { Transforms } from "slate";

export const useParagraphExtension = (): SlateExtension => {
  return {
    renderElement: props => {
      if (props.element.type === "p") {
        return <p {...props.attributes}>{props.children}</p>;
      }
      return undefined;
    },
    insertBreak: (editor, next) => {
      next(editor);
      Transforms.setNodes(editor, { type: "p" });
    },
  };
};
