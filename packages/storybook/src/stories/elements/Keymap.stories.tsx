import { useSlateKeymap, useSlateWithExtensions } from "@slate-extensions/core";
import {
  useGapCursorExtension,
  useHeadingsExtension,
  useHorizontalRuleExtension,
  useParagraphExtension,
} from "@slate-extensions/elements";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Transforms } from "slate";
import { Editable, Slate } from "slate-react";

export default {
  title: "Elements/Keymap",
} as Meta;

export const Keymap: Story = () => {
  const { getEditableProps, getSlateProps } = useSlateWithExtensions({
    initialState: [
      {
        children: [
          { text: "This is a slate editor with keyboard extensions enabled" },
        ],
      },
    ],
    extensions: [
      useSlateKeymap({
        "cmd+option+0": editor => {
          Transforms.setNodes(editor, { type: "p" });
          return true;
        },
        "cmd+option+1": editor => {
          Transforms.setNodes(editor, { type: "h1" });
          return true;
        },
        "cmd+option+2": editor => {
          Transforms.setNodes(editor, { type: "h2" });
          return true;
        },
        "cmd+option+3": editor => {
          Transforms.setNodes(editor, { type: "h3" });
          return true;
        },
        "cmd+option+4": editor => {
          Transforms.setNodes(editor, { type: "h4" });
          return true;
        },
        "cmd+option+5": editor => {
          Transforms.setNodes(editor, { type: "h5" });
          return true;
        },
        "cmd+option+6": editor => {
          Transforms.setNodes(editor, { type: "h6" });
          return true;
        },
        "cmd+enter": (editor, options) => {
          if (options?.keyEvent !== undefined) {
            options.keyEvent.preventDefault();
          }
          Transforms.insertNodes(editor, [
            { type: "hr", children: [{ text: "" }] },
          ]);
          return true;
        },
      }),
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
