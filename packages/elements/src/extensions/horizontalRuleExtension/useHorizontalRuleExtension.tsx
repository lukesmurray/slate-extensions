import { SlateExtension } from "@slate-extensions/common";
import React from "react";
import { RenderElementProps, useFocused, useSelected } from "slate-react";
import { hrType } from "./types";

export const useHorizontalRuleExtension = (): SlateExtension => {
  return {
    renderElement: props => {
      if (props.element.type === hrType) {
        return HrElement(props);
      }
      return undefined;
    },
    // hr elements are void since they can't contain children
    isVoid: (element, editor, next) => {
      if (element.type === hrType) {
        return true;
      }
      return next(element, editor);
    },
  };
};
function HrElement(props: RenderElementProps) {
  const selected = useSelected();
  const focused = useFocused();
  return (
    // https://github.com/ianstormtaylor/slate/blob/5267f07175b8b4a6d828d604920b65680d24c9e4/site/examples/images.tsx#L94-L107
    // we use this odd nesting to avoid slate errors
    <div {...props.attributes}>
      <div contentEditable={false}>
        {/* copy native browser focus styles https://css-tricks.com/copy-the-browsers-native-focus-styles/ */}
        <hr
          style={{
            outline: selected && focused ? "5px auto Highlight" : "none",
          }}
        />
      </div>
      {props.children}
    </div>
  );
}
