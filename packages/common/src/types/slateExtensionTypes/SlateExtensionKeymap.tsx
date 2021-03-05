import { SlateExtensionCommand } from "./SlateExtensionCommand";

/**
 * A slate extension keymap is a dictionary of key shortcuts specified using `is-hotkey` format
 * to SlateExtension commands
 */
export type SlateExtensionKeymap = Record<string, SlateExtensionCommand>;
