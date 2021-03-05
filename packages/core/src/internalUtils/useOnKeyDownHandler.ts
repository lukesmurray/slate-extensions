import { compose, isDefined, SlateExtension } from "@slate-extensions/common";
import { useMemo } from "react";
import { Editor } from "slate";
import { EditableProps } from "slate-react/dist/components/editable";

export const useOnKeyDownHandler = (
  editor: Editor,
  extensions: SlateExtension[]
) => {
  return useMemo<EditableProps["onKeyDown"]>(() => {
    const handlers = extensions.map(x => x.onKeyDown).filter(isDefined);
    if (handlers.length === 0) {
      return undefined;
    }
    const middleware = compose(...handlers);
    return e => middleware(e, editor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...extensions.flatMap(e => e.onKeyDownDeps ?? [])]);
};
