import {
  Controlled,
  Highlights,
  LogOperations,
  Mentions,
  MentionsAndHighlights,
  ToolbarExample,
  Uncontrolled,
} from "@slate-extensions/storybook";
import * as React from "react";
import "./style.css";

const App = () => {
  return (
    <div id="app">
      <h1>UseSlateWithExtensions</h1>
      <h2>Uncontrolled</h2>
      <Uncontrolled />
      <h2>Controlled</h2>
      <Controlled />
      <h2>Mentions</h2>
      <Mentions />
      <h2>Highlights</h2>
      <Highlights />
      <h2>Mentions and Highlights</h2>
      <MentionsAndHighlights />
      <h2>Log Operations</h2>
      <LogOperations />
      <h2>Balloon Toolbar</h2>
      <ToolbarExample />
    </div>
  );
};
export default App;
