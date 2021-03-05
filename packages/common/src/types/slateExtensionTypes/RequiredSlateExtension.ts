import { SlateExtension } from ".";

/**
 * Same API as slate extensions but all properties are required.
 * Useful when you need to access the type of a function for example
 * useCallback<RequiredSlateExtension["isInline"]>(() => {...})
 */
export type RequiredSlateExtension = Required<SlateExtension>;
