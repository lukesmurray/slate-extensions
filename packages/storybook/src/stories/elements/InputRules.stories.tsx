import { SlateExtensionCommand } from "@slate-extensions/common";
import {
  setBlockTypeInputCommand,
  useSlateInputRules,
  useSlateWithExtensions,
} from "@slate-extensions/core";
import {
  useGapCursorExtension,
  useHeadingsExtension,
  useHorizontalRuleExtension,
  useParagraphExtension,
} from "@slate-extensions/elements";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Editable, Slate } from "slate-react";

export default {
  title: "Elements/Input Rules",
} as Meta;

export const InputRules: Story = () => {
  const { getEditableProps, getSlateProps } = useSlateWithExtensions({
    initialState: [
      {
        children: [{ text: "This is a slate editor with input rules enabled" }],
      },
    ],
    extensions: [
      useSlateInputRules([
        {
          match: /^# $/g,
          command: setBlockTypeInputCommand("h1"),
        },
        {
          match: /^## $/g,
          command: setBlockTypeInputCommand("h2"),
        },
        {
          match: /^### $/g,
          command: setBlockTypeInputCommand("h3"),
        },
        {
          match: /^#### $/g,
          command: setBlockTypeInputCommand("h4"),
        },
        {
          match: /^##### $/g,
          command: setBlockTypeInputCommand("h5"),
        },
        {
          match: /^###### $/g,
          command: setBlockTypeInputCommand("h6"),
        },
        {
          match: /^---$/g,
          command: setBlockTypeInputCommand("hr"),
        },
        {
          match: /^- $/g,
          command: wrapListCommand(),
        },
      ]),
      useParagraphExtension(),
      useHeadingsExtension(),
      useHorizontalRuleExtension(),
      useGapCursorExtension(),
    ],
  });

  return (
    <Slate {...getSlateProps()}>
      <Editable {...getEditableProps()} />
    </Slate>
  );
};

const wrapListCommand = (): SlateExtensionCommand => editor => {
  // check to see if we're in a list
  // if we are in a list then don't wrap
  // if we are not in a list
  // wrap the node in the correct list type
  // set the correct list sub type
  return false;
};
