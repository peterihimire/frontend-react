import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

// THIS IS THE DARK BACKGROUND TO CLICK TO CLOSE THE SIDE-DRAWER
const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
