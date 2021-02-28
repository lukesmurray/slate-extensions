import { SlateExtension } from "@slate-extensions/common";
import React from "react";
import { h1Type, h2Type, h3Type, h4Type, h5Type, h6Type } from "./types";

export const useHeadingsExtension = (): SlateExtension => {
  return {
    renderElement: props => {
      if (props.element.type === h1Type) {
        return <h1 {...props.attributes}>{props.children}</h1>;
      } else if (props.element.type === h2Type) {
        return <h2 {...props.attributes}>{props.children}</h2>;
      } else if (props.element.type === h3Type) {
        return <h3 {...props.attributes}>{props.children}</h3>;
      } else if (props.element.type === h4Type) {
        return <h4 {...props.attributes}>{props.children}</h4>;
      } else if (props.element.type === h5Type) {
        return <h5 {...props.attributes}>{props.children}</h5>;
      } else if (props.element.type === h6Type) {
        return <h6 {...props.attributes}>{props.children}</h6>;
      }
      return undefined;
    },
  };
};
