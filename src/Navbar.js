// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {/* <li className="nav-item">
          <Link to="/Scan">Add Data</Link>
        </li>
        <li className="nav-item">
          <Link to="/home">Mismatched Data</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">Scanned Data</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact">SAP Data</Link>
        </li> */}
        <li className="nav-item logout">
          <Link to="/show/:filename">Show file</Link>
        </li>
        {/* <li className="nav-item logout">
          <Link to="fileList">FileList</Link>
        </li> */}
        <li className="nav-item logout">
          <Link to="/">Log Out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
