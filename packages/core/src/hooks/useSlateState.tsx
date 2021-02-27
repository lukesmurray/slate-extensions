import {
  slateEmptyValue,
  useSlateWithExtensionsOptions,
} from "@slate-extensions/common";
import { useCallback, useState } from "react";
import { Descendant } from "slate";

/**
 * Simple hook to manage slate state using react.
 * @param initialState the initial slate state
 */
export const useSlateState = (
  initialState?: Descendant[]
): [Descendant[], (value: Descendant[]) => void] => {
  const [value, setValue] = useState(initialState ?? slateEmptyValue);
  const onChange = useCallback<
    NonNullable<useSlateWithExtensionsOptions["onChange"]>
  >(newValue => {
    setValue(newValue);
  }, []);
  return [value, onChange];
};
