import {
  getBlockAbove,
  isCollapsed,
  RequiredSlateExtension,
  SlateExtension,
  SlateExtensionCommand,
} from "@slate-extensions/common";
import { useCallback } from "react";
import { Editor } from "slate";

export interface SlateExtensionInputRule {
  /**
   * Called on insertText with the text from the block start to the selection
   * The just inserted text is added to the text this is matched with even
   * though the just inserted text has not been inserted into the editor yet.
   * You can access the just inserted text in the SlateExtensionCommand options.
   */
  match: RegExp;
  /**
   * called with the editor state before the new text has been inserted
   * the options contain the insertedText and the matchText
   */
  command: SlateExtensionCommand;
}

export const useSlateInputRules = (
  rules: SlateExtensionInputRule[]
): SlateExtension => {
  const insertTextHandler = useCallback<RequiredSlateExtension["insertText"]>(
    (text, editor, next) => {
      console.log("insert text fired");
      const { selection } = editor;
      if (isCollapsed(selection)) {
        // get the block above the current selection
        const blockAboveEntry = getBlockAbove(editor);
        // get the start of the block above
        const blockAboveStart = Editor.start(editor, blockAboveEntry[1]);
        // get the current block text (not including the inserted text)
        const blockText = Editor.string(editor, {
          anchor: blockAboveStart,
          focus: selection.focus,
        });
        // create the new block text
        const newBlockText = blockText + text;

        // check if any rule matches the new block text
        for (const rule of rules) {
          if (
            rule.match.test(newBlockText) &&
            rule.command(editor, {
              insertedText: text,
              matchText: newBlockText,
            })
          ) {
            return;
          }
        }
        return next(text, editor);
      } else {
        return next(text, editor);
      }
    },
    [rules]
  );
  const insertDataHandler = useCallback<RequiredSlateExtension["insertData"]>(
    (data, editor, next) => {
      console.log("insert data handler called", data);
      return next(data, editor);
    },
    []
  );
  const onDOMBeforeInputHandler = useCallback<
    RequiredSlateExtension["onDOMBeforeInput"]
  >((event, editor, next) => {
    console.log("onDOMBeforeInput called", event);
    return next?.(event, editor);
  }, []);
  return {
    insertText: insertTextHandler,
    insertTextDeps: [insertTextHandler],
    insertData: insertDataHandler,
    insertDataDeps: [insertDataHandler],
    onDOMBeforeInput: onDOMBeforeInputHandler,
    onDOMBeforeInputDeps: [onDOMBeforeInputHandler],
  };
};
