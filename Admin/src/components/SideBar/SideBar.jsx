import MaterialIcon from "material-icons-react";
import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./SideBar.css";

const SideBar = () => {
  const [activeStats, setActiveStats] = useState("inactive");

  useLayoutEffect(() => {
    if (window.location.pathname === "/stats") {
      setActiveStats("active");
    }
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <div className="sidebar-menu">
          <Link
            to={"/stats"}
            onClick={() => {
              setActiveStats("active");
            }}
          >
            <div className={`sidebar-menu-item ${activeStats}`}>
              <div className="sidebar-menu-item-icon">
                <MaterialIcon icon="bar_chart" size={"large"} color="#ffffff" />
              </div>
              <div
                className={`
                sidebar-menu-item-text ${activeStats}
              `}
              >
                Stats
              </div>
            </div>
          </Link>
          <Link
            to={"access"}
            onClick={() => {
              setActiveStats("inactive");
            }}
          ></Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
