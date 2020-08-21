import React from "react";
import ReactDOM from "react-dom";

import DatePicker from './components/datePicker/index';

function App() {
  return <DatePicker />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
