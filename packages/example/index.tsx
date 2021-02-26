import { Thing } from "@slate-extensions/core";
import * as React from "react";
import "react-app-polyfill/ie11";
import * as ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <Thing />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
