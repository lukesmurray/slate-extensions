import { SlateExtension, SlateExtensionKeymap } from "@slate-extensions/common";
import { useMemo } from "react";
import { createKeyDownHandlerFromKeymap } from "../utils/createKeyDownHandlerFromKeymap";

export const useSlateKeymap = (
  keymap: SlateExtensionKeymap
): SlateExtension => {
  const onKeyDownHandler = useMemo(
    () => createKeyDownHandlerFromKeymap(keymap),
    [keymap]
  );
  return {
    onKeyDown: onKeyDownHandler,
    onKeyDownDeps: [onKeyDownHandler],
  };
};
