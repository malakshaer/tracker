import React from "react";
import logo from "../../assets/logo.png";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      {/* <div className="top-bar__logo"> */}
      <img className="logo" src={logo} alt="logo" />
      {/* </div> */}
    </div>
  );
};

export default TopBar;
