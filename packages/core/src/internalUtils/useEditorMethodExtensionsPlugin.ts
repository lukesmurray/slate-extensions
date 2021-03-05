import {
  compose,
  FunctionPropertyNames,
  isDefined,
  SlateExtension,
  SlateExtensionFunctions,
  SlatePlugin,
} from "@slate-extensions/common";
import { useCallback } from "react";
import { Editor } from "slate";

export const useEditorMethodExtensionsPlugin = <E extends Editor = Editor>(
  extensions: SlateExtension[],
  method: Extract<FunctionPropertyNames<E>, SlateExtensionFunctions>
) =>
  useCallback<SlatePlugin<E>>(
    (editor: E) => {
      const { [method]: editorMethod } = editor;

      const middleware = compose(
        ...extensions.map(extension => extension[method]).filter(isDefined),
        editorMethod
      );

      editor[method] = ((...args: any[]) => {
        //@ts-expect-error
        return middleware.apply(null, [...args, editor]);
      }) as any;

      return editor;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...extensions.flatMap(e => e[`${method}Deps` as const] ?? [])]
  );
