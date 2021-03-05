import { RequiredSlateExtension } from ".";
import { FunctionPropertyNames } from "..";

/**
 * Get the names of all the function properties on a slate extension
 */
export type SlateExtensionFunctions = FunctionPropertyNames<
  RequiredSlateExtension
>;
