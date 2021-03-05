import { SlateExtension } from "@slate-extensions/common";
import { createKeyDownHandlerFromKeymap } from "@slate-extensions/core";
import React from "react";
import {
  listItemType,
  orderedListType,
  TaskListItem,
  taskListListItemType,
  taskListType,
  unorderedListType,
} from ".";

export const useListExtension = (): SlateExtension => {
  return {
    renderElement: props => {
      const { element } = props;
      if (element.type === orderedListType) {
        return <ol {...props.attributes}>{props.children}</ol>;
      }
      if (element.type === unorderedListType) {
        return <ul {...props.attributes}>{props.children}</ul>;
      }
      if (element.type === taskListType) {
        return <ul {...props.attributes}>{props.children}</ul>;
      }
      if (element.type === listItemType) {
        return <li {...props.attributes}>{props.children}</li>;
      }
      if (element.type === taskListListItemType) {
        return <TaskListItem {...props} />;
      }
      return undefined;
    },
    insertBreak: (editor, next) => {
      // if in list
      //   if top level
      //      break out
      //   else
      //      unindent
      return next(editor);
    },
    deleteBackward: (unit, editor, next) => {
      // if at start of list
      return next(unit, editor);
    },
    onKeyDown: createKeyDownHandlerFromKeymap({
      // handle tab
      tab: (_editor, _options) => {
        // indent the list
        return false;
      },
      // handle shift tab
      "shift+tab": (_editor, _options) => {
        // unindent the list
        return false;
      },
    }),
    normalizeNode: (entry, editor, next) => {
      // make sure list are valid
      // valid elements
      // ul and ol can only contain ul and ol or li
      // tl can only contain tl-li and tl
      // check list structure
      // wrapper can only contain list items
      // list items can only contain text or list wrappers
      // const [node, path] = entry;
      // if (isListElement(node)) {
      // }
      next(entry, editor);
    },
  };
};

// const liftNodes = (editor: Editor) => {
//   // check for the new parent
//   const [listMatch] = Editor.nodes(editor, {
//     match: n => n.type === "bulleted-list" || n.type === "numbered-list",
//   });
//   // verify there is a list to lift the nodes
//   if (listMatch) {
//     // 'lift' the list-item to the next parent
//     Transforms.liftNodes(editor, { match: n => n.type === "list-item" });
//   }
// };

// const undentItem = (editor: Editor) => {
//   const { selection } = editor;

//   // check that there is a current selection without highlight
//   if (selection && Range.isCollapsed(selection)) {
//     const [match] = Editor.nodes(editor, {
//       match: n => n.type === "list-item",
//     });

//     // check that there was a match
//     if (match) {
//       // 'lift' the list-item to the next parent
//       liftNodes(editor);
//       // check for the new parent
//       const [listMatch] = Editor.nodes(editor, {
//         match: n => n.type === "bulleted-list" || n.type === "numbered-list",
//       });
//       // if it is no longer within a ul/ol, turn the element into a normal paragraph
//       if (!listMatch) {
//         Transforms.setNodes(
//           editor,
//           { type: "paragraph" },
//           { match: n => n.type === "list-item" }
//         );
//       }
//     }
//   }
// };

// const indentItem = (editor: Editor, maxDepth = defaultMax) => {
//   const { selection } = editor;

//   // check that there is a current selection without highlight
//   if (selection && Range.isCollapsed(selection)) {
//     const [match] = Editor.nodes(editor, {
//       match: n => n.type === "list-item",
//     });

//     // check that there was a match
//     if (match) {
//       // wrap the list item into another list to indent it within the DOM
//       const [listMatch] = Editor.nodes(editor, {
//         mode: "lowest",
//         match: n => n.type === "bulleted-list" || n.type === "numbered-list",
//       });

//       if (listMatch) {
//         let depth = listMatch[1].length;
//         if (depth <= maxDepth) {
//           Transforms.wrapNodes(editor, {
//             type: listMatch[0].type,
//             children: [],
//           });
//         }
//       }
//     }
//   }
// };
