import { EditorInterface } from "slate";

export type EditorAboveOptions = NonNullable<
  Parameters<EditorInterface["above"]>[1]
>;
