import { useSlateState, useSlateWithExtensions } from "@slate-extensions/core";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Descendant } from "slate";
import { Editable, Slate } from "slate-react";
import "tippy.js/animations/scale.css";
import "tippy.js/themes/light.css";
import { SearchBar, useHighlightExtension } from "./Highlights.stories";
import { MentionSelect, useMentionExtension } from "./Mentions.stories";

export default {
  title: "Examples/MentionsAndHighlights",
} as Meta;

export const MentionsAndHighlights: Story = () => {
  const [value, onChange] = useSlateState(initialValue);

  // define the extensions
  const { getSearchBarProps, ...highlightExtension } = useHighlightExtension(
    "search"
  );
  const { getMentionSelectProps, ...mentionExtension } = useMentionExtension();

  // create slate with the extensions
  const { getEditableProps, getSlateProps } = useSlateWithExtensions({
    onChange,
    value,
    extensions: [highlightExtension, mentionExtension],
  });

  // render the search bar and the mention select
  return (
    <Slate {...getSlateProps()}>
      <SearchBar {...getSearchBarProps()} />
      <br />
      <Editable {...getEditableProps()} />
      <MentionSelect {...getMentionSelectProps()} />
    </Slate>
  );
};

const initialValue: Descendant[] = [
  {
    children: [
      {
        text:
          "This example show you how you might implement a simple @-mentions feature along with a search highlight feature",
      },
    ],
  },
  {
    children: [
      { text: "Try mentioning characters, like " },
      {
        type: "mention",
        character: "R2-D2",
        children: [{ text: "" }],
      },
      { text: " or " },
      {
        type: "mention",
        character: "Mace Windu",
        children: [{ text: "" }],
      },
      { text: "!" },
    ],
  },
  {
    children: [{ text: "Try searching by typing in the search box above!" }],
  },
];
