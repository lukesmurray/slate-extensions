import Tippy from "@tippyjs/react";
import React from "react";
import { useSlate } from "slate-react";
import { useBalloonMove, useBalloonShow } from "../hooks";

export interface BalloonToolbarProps {}

export const BalloonToolbar: React.FC<BalloonToolbarProps> = props => {
  const editor = useSlate();
  const visible = useBalloonShow(editor);
  const getReferenceClientRect = useBalloonMove(visible);
  return (
    <Tippy
      theme={"light"}
      arrow={true}
      content={props.children}
      getReferenceClientRect={getReferenceClientRect}
      interactive={true}
      visible={visible}
      appendTo={document.body}
      duration={0}
    />
  );
};
