import {
  RequiredSlateExtension,
  SlateExtensionKeymap,
} from "@slate-extensions/common";
import isHotkey from "is-hotkey";

/**
 * Create a keydown handler from a slate extension key map
 * @param keymap a slate extension key map
 */
export function createKeyDownHandlerFromKeymap(
  keymap: SlateExtensionKeymap
): RequiredSlateExtension["onKeyDown"] {
  return (event, editor, next) => {
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
  };
}
