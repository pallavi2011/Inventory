import React, {Fragment} from 'react';
// import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
 const Navbar = () => {
   
  return (
    <nav className="navbar bg-light">
        
        <h1><a href="/">Inventory Management System</a>
        </h1>
        <Fragment>
        <ul>
            <li><a href="/register">Register</a></li>
            <li><a href="/login">Login</a></li>
            </ul>
        </Fragment> 
  </nav>
  );
};

export default Navbar;