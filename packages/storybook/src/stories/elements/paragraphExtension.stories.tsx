import { useSlateState, useSlateWithExtensions } from "@slate-extensions/core";
import {
  paragraphType,
  useParagraphExtension,
} from "@slate-extensions/elements";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Editable, Slate } from "slate-react";

export default {
  title: "Elements/Paragraph",
} as Meta;

export const Paragraph: Story = () => {
  const [value, onChange] = useSlateState([
    {
      children: [
        { text: "This is a slate editor where every line is a paragraph" },
      ],
      type: paragraphType,
    },
  ]);

  const { getEditableProps, getSlateProps } = useSlateWithExtensions({
    onChange,
    value,
    extensions: [useParagraphExtension()],
  });

  return (
    <Slate {...getSlateProps()}>
      <Editable {...getEditableProps()} />
    </Slate>
  );
};
