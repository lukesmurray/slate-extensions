import { BalloonToolbar } from "@slate-extensions/balloon-toolbar";
import { useSlateState, useSlateWithExtensions } from "@slate-extensions/core";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Editable, Slate } from "slate-react";

export default {
  title: "BalloonToolbar",
} as Meta;

export const ToolbarExample: Story = () => {
  const [value, onChange] = useSlateState([
    { children: [{ text: "Highlight some text to see the toolbar" }] },
  ]);

  const { getEditableProps, getSlateProps } = useSlateWithExtensions({
    onChange,
    value,
  });

  return (
    <Slate {...getSlateProps()}>
      <Editable {...getEditableProps()} />
      <BalloonToolbar>This is the balloon content</BalloonToolbar>
    </Slate>
  );
};
