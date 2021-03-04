import { useSlateWithExtensions } from "@slate-extensions/core";
import {
  useGapCursorExtension,
  useHorizontalRuleExtension,
  useParagraphExtension,
} from "@slate-extensions/elements";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Editable, Slate } from "slate-react";

export default {
  title: "Elements/Horizontal Rule",
} as Meta;

export const HorizontalRule: Story = () => {
  const { getEditableProps, getSlateProps } = useSlateWithExtensions({
    initialState: [
      { type: "p", children: [{ text: "Hello world" }] },
      { type: "hr", children: [{ text: "" }] },
      {
        type: "p",
        children: [{ text: "The quick brown fox jumped over the lazy dog" }],
      },
    ],
    extensions: [
      useHorizontalRuleExtension(),
      useParagraphExtension(),
      // you probably want to use the gap cursor with any extension that has
      // void elements, such as the horizontal rule extension
      // void elements are hard to select and the gap cursor lets you select
      // around them easily
      useGapCursorExtension(),
    ],
  });

  return (
    <Slate {...getSlateProps()}>
      <Editable {...getEditableProps()} />
    </Slate>
  );
};
