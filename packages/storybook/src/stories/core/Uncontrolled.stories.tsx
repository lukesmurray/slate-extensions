import { useSlateWithExtensions } from "@slate-extensions/core";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Editable, Slate } from "slate-react";

export default {
  title: "Examples/Uncontrolled",
} as Meta;

export const Uncontrolled: Story = () => {
  const { getEditableProps, getSlateProps } = useSlateWithExtensions({
    initialState: [
      { children: [{ text: "This is an uncontrolled slate object" }] },
    ],
  });

  return (
    <Slate {...getSlateProps()}>
      <Editable {...getEditableProps()} />
    </Slate>
  );
};
