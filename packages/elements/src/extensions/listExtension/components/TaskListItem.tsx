import React from "react";
import { Transforms } from "slate";
import { ReactEditor, RenderElementProps, useSlateStatic } from "slate-react";
import { taskListListItemType } from "..";

export const TaskListItem = (props: RenderElementProps) => {
  const { element } = props;
  if (element.type !== taskListListItemType) {
    throw new Error("invalid type for task list item");
  }

  const editor = useSlateStatic();

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const elementPath = ReactEditor.findPath(editor, element);
    Transforms.setNodes(
      editor,
      { checked: event.target.checked },
      { at: elementPath }
    );
  };

  return (
    <li {...props.attributes}>
      <input
        checked={element.checked}
        type="checkbox"
        onChange={handleInputChange}
      />
      {props.children}
    </li>
  );
};
