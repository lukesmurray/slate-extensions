import { useSlateWithExtensions } from "@slate-extensions/core";
import {
  listItemType,
  orderedListType,
  taskListListItemType,
  taskListType,
  unorderedListType,
  useListExtension,
  useParagraphExtension,
} from "@slate-extensions/elements";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Editable, Slate } from "slate-react";

export default {
  title: "Elements/List",
} as Meta;

export const List: Story = () => {
  const { getEditableProps, getSlateProps } = useSlateWithExtensions({
    initialState: [
      {
        type: unorderedListType,
        children: [
          { type: listItemType, children: [{ text: "First List Item" }] },
          { type: listItemType, children: [{ text: "Second List Item" }] },
          { type: listItemType, children: [{ text: "Third List Item" }] },
        ],
      },
      {
        type: orderedListType,
        children: [
          { type: listItemType, children: [{ text: "First List Item" }] },
          { type: listItemType, children: [{ text: "Second List Item" }] },
          { type: listItemType, children: [{ text: "Third List Item" }] },
        ],
      },
      {
        type: taskListType,
        children: [
          {
            type: taskListListItemType,
            checked: false,
            children: [{ text: "First Todo" }],
          },
          {
            type: taskListListItemType,
            checked: true,
            children: [{ text: "Second Todo" }],
          },
          {
            type: taskListListItemType,
            checked: false,
            children: [{ text: "Third Todo" }],
          },
        ],
      },
    ],
    extensions: [useListExtension(), useParagraphExtension()],
  });

  return (
    <Slate {...getSlateProps()}>
      <Editable {...getEditableProps()} />
    </Slate>
  );
};
