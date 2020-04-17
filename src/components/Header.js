import React from "react";
import Search from "./search/Search";
import "../css/header.css";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => (
  <div className="header">
    <div className="header-left-content">
      <FontAwesomeIcon
        icon={faComment}
        className="header-icon"
      ></FontAwesomeIcon>
      <span className="logo-text">How I did it</span>
    </div>
    <div className="header-main-content">
      <Search></Search>
    </div>
    <div className="header-right-content">alskdjalskdj</div>
  </div>
);

export default Header;
