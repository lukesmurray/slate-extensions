import {
  compose,
  FunctionPropertyNames,
  isDefined,
  SlateExtension,
  SlatePlugin,
} from "@slate-extensions/common";
import { useCallback } from "react";
import { Editor } from "slate";

export const useEditorMethodExtensionsPlugin = (
  extensions: SlateExtension[],
  method: FunctionPropertyNames<Editor>
): SlatePlugin =>
  useCallback<SlatePlugin>(
    (editor: Editor) => {
      const { [method]: editorMethod } = editor;

      const middleware = compose(
        ...extensions.map(extension => extension[method]).filter(isDefined),
        editorMethod
      );

      editor[method] = (...args: any[]) => {
        return middleware.apply(null, [...args, editor] as any) as any;
      };

      return editor;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...extensions.flatMap(e => e[`${method}Deps` as const] ?? [])]
  );
