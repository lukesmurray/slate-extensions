import { Editor } from "slate";

/**
 * A command is a function that encapsulates an editing action.
 * If the command is handled then the command returns true.
 * The command takes an optional dry parameter which if true means the command
 * should return whether or not it would handle the action without making any
 * actual changes
 */

export interface SlateExtensionCommand {
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
       * Used in Key Maps
       * if the command is used to handle a keyboard event then this will be the event which called the command
       */
      keyEvent?: KeyboardEvent;
      /**
       * Used in Input Rules
       * the text which is being inserted in the editor (but not inserted yet)
       */
      insertedText?: string;
      /**
       * Used in Input Rules
       * the text which was matched on for an input rule
       */
      matchText?: string;
    }
  ): boolean;
}
