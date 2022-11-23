import logo from "../images/header-logo.svg";
import { Route, Link, useRouteMatch } from "react-router-dom";
import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Header(props) {
  const headerLink = React.useContext(CurrentUserContext).headerLink;
  return (
    <header className="header">
      <img src={logo} alt="Логотип проекта" className="header__logo" />
      {headerLink}
    </header>
  );
}

export default Header;
