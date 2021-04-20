import { BalloonToolbar } from "@slate-extensions/balloon-toolbar";
import { useSlateWithExtensions } from "@slate-extensions/core";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Editable, Slate } from "slate-react";

export default {
  title: "BalloonToolbar",
} as Meta;

export const ToolbarExample: Story = () => {
  const { getEditableProps, getSlateProps } = useSlateWithExtensions({
    initialState: [
      {
        children: [{ text: "Highlight some text to see the toolbar" }],
      },
    ],
    "data-testid": "toolbarExample-editor",
  });

  return (
    <Slate {...getSlateProps()}>
      <Editable {...getEditableProps()} />
      <BalloonToolbar>
        <div data-testid="toolbarExample-content">
          This is some balloon content
        </div>
      </BalloonToolbar>
    </Slate>
  );
};
