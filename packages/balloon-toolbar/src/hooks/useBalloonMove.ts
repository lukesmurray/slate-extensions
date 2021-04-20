import { useCallback } from "react";

const zeroRect: ClientRect = {
  top: 0,
  bottom: 0,
  height: 0,
  width: 0,
  left: 0,
  right: 0,
};

const getBoundingClientRect = (): DOMRect | null => {
  const domSelection = window.getSelection();
  const domRange = domSelection?.getRangeAt(0);
  const rect = domRange?.getBoundingClientRect();
  return rect ?? null;
};

/**
 * Function exported from tippyJS
 * provides a rect to render tippyjs in
 */
export interface GetReferenceClientRect {
  (): ClientRect | DOMRect;
}

/**
 * Move when the selection changes.
 */
export const useBalloonMove: (
  visible: boolean
) => GetReferenceClientRect = visible => {
  return useCallback(() => {
    if (!visible) {
      return zeroRect;
    }
    return getBoundingClientRect() ?? zeroRect;
  }, [visible]);
};
