import { useSlateState, useSlateWithExtensions } from "@slate-extensions/core";
import {
  h1Type,
  h2Type,
  h3Type,
  h4Type,
  h5Type,
  h6Type,
  useHeadingsExtension,
} from "@slate-extensions/elements";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Editable, Slate } from "slate-react";

export default {
  title: "Elements/Headers",
} as Meta;

export const Headers: Story = () => {
  const [value, onChange] = useSlateState([
    { type: h1Type, children: [{ text: "This is an h1 heading" }] },
    { type: h2Type, children: [{ text: "This is an h2 heading" }] },
    { type: h3Type, children: [{ text: "This is an h3 heading" }] },
    { type: h4Type, children: [{ text: "This is an h4 heading" }] },
    { type: h5Type, children: [{ text: "This is an h5 heading" }] },
    { type: h6Type, children: [{ text: "This is an h6 heading" }] },
  ]);

  const { getEditableProps, getSlateProps } = useSlateWithExtensions({
    onChange,
    value,
    extensions: [useHeadingsExtension()],
  });

  return (
    <Slate {...getSlateProps()}>
      <Editable {...getEditableProps()} />
    </Slate>
  );
};
