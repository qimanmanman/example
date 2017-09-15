import React from "react";
import ReactDom from "react-dom";
import MyApp from "./sub";
import "./base.css";
import "./main.css";

ReactDom.render(<MyApp />,
    document.getElementById('content'));