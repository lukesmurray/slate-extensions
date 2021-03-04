import { SlateExtension } from "@slate-extensions/common";
import isHotkey from "is-hotkey";
import { useCallback } from "react";
import { Editor } from "slate";

/**
 * A command is a function that encapsulates an editing action.
 * If the command is handled then the command returns true.
 * The command takes an optional dry parameter which if true means the command
 * should return whether or not it would handle the action without making any
 * actual changes
 */
interface SlateExtensionCommand {
  (
    /**
     * the slate extensions editor
     */
    editor: Editor,
    /**
     * options for the command
     */
    options?: {
      /**
       * if true then the command should return true if it would normally handle the change
       * but it should not make any changes to the editor
       */
      dry?: boolean;
      /**
       * if the command is used to handle a keyboard event then this will be the event which called the command
       */
      keyEvent?: KeyboardEvent;
    }
  ): boolean;
}

/**
 * A slate extension keymap is a dictionary of key shortcuts specified using `is-hotkey` format
 * to SlateExtension commands
 */
type SlateExtensionKeymap = Record<string, SlateExtensionCommand>;

/**
 * Combine together a list of commands into a single command.
 * Calls each command one at a time until one returns true.
 * @param commands a list of commands to combine together
 */
export const chainCommands = (
  ...commands: SlateExtensionCommand[]
): SlateExtensionCommand => {
  return (editor, options) => {
    for (const command of commands) {
      if (command(editor, options)) {
        return true;
      }
    }
    return false;
  };
};

export const useSlateKeymap = (
  keymap: SlateExtensionKeymap
): SlateExtension => {
  const onKeyDownHandler = useCallback<
    NonNullable<SlateExtension["onKeyDown"]>
  >(
    (event, editor, next) => {
      for (const [key, command] of Object.entries(keymap)) {
        // TODO(lukemurray): not sure why I need to cast as any here
        if (
          isHotkey(key, event as any) &&
          command(editor, { keyEvent: event as any })
        ) {
          return;
        }
      }
      next?.(event, editor);
    },
    [keymap]
  );
  return {
    onKeyDown: onKeyDownHandler,
    onKeyDownDeps: [onKeyDownHandler],
  };
};
