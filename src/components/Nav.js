import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = props => {
  return (
    <nav>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
      </ul>
      <h3>Student Dashboard</h3>
    </nav>
  );
};

export default Nav;
