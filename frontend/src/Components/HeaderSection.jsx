import React from "react";
import "@fontsource/open-sans";
import logo from "../Images/logo.png";

function HeaderSection() {
  return (
    <div
      className="slide-right"
      style={{
        marginLeft: "100px",
        height: "70px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        alt="Agri Assist Logo"
        style={{
          height: "50px",
          width: "50px",
          marginRight: "20px",
        }}
      />

      <span
        style={{
          fontFamily: "Open Sans",
          fontWeight: "bold",
          fontSize: "22px",
        }}
      >
        AGRI ASSIST
      </span>
    </div>
  );
}

export default HeaderSection;
