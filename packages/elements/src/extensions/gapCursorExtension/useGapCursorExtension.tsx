import { SlateExtension } from "@slate-extensions/common";
import React from "react";
import { Editor, Element, Path, Transforms } from "slate";
import { paragraphType } from "..";
import { gapCursorType } from "./types";

/**
 * Modeled after prosemirror gap cursor
 * https://github.com/ProseMirror/prosemirror-gapcursor/
 * Allows the user to place selection before and after void block elements
 * When the user types in that selection then the gap cursor is transformed
 * into the default element type
 */
export const useGapCursorExtension = (
  defaultElementType: Element["type"] = paragraphType
): SlateExtension => {
  return {
    renderElement: props => {
      if (props.element.type === gapCursorType) {
        return <div {...props.attributes}>{props.children}</div>;
      }
      return undefined;
    },
    normalizeNode: (entry, editor, next) => {
      // TODO(lukemurray): https://prosemirror.net/examples/markdown/
      // we want to replicate the behavior from prosemirror which inserts a 1px div before and after the hr
      // backspace on the div selects the hr instead of deleting it

      const [node, path] = entry;

      // if the entry is a void block
      if (Editor.isBlock(editor, node) && Editor.isVoid(editor, node)) {
        // make sure the block before a void block is not void
        const blockBeforeEntry = Editor.previous(editor, {
          at: path,
          match: node => Editor.isBlock(editor, node),
        });
        if (
          blockBeforeEntry === undefined ||
          Editor.isVoid(editor, blockBeforeEntry[0])
        ) {
          // insertNodes only seems to work at the end of an element
          // so in order to insert a node before an element we insert the node
          // at the end of the element then move the node to before the element
          Transforms.insertNodes(
            editor,
            [{ type: gapCursorType, children: [{ text: "" }] }],
            { at: Editor.end(editor, path) }
          );
          Transforms.moveNodes(editor, {
            // move element at next path to the current path
            // this causes the current element to shift
            at: Path.next(path),
            to: path,
          });
          return;
        }

        // make sure the block after a void block is not void
        const blockAfterEntry = Editor.next(editor, {
          at: path,
          match: node => Editor.isBlock(editor, node),
        });
        if (
          blockAfterEntry === undefined ||
          Editor.isVoid(editor, blockAfterEntry[0])
        ) {
          Transforms.insertNodes(
            editor,
            [{ type: gapCursorType, children: [{ text: "" }] }],
            { at: Editor.end(editor, path) }
          );
          return;
        }
      }

      // if the gap cursor ever gets text transform it into a paragraph
      if (
        Element.isElement(node) &&
        node.type === gapCursorType &&
        Editor.string(editor, path).length > 0
      ) {
        Transforms.setNodes(
          editor,
          { type: defaultElementType },
          {
            at: path,
            match: node =>
              Element.isElement(node) && node.type === gapCursorType,
          }
        );
        return;
      }

      // Fall back to the original `normalizeNode` to enforce other constraints.
      next(entry, editor);
    },
  };
};
