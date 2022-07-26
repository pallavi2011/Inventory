import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({login, isAuthenticated, user}) => {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
   
  });
  const {email, password} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    login({email, password});
  }

  if(isAuthenticated){
    return <Redirect to="/"/>
  }
  return (
  <Fragment>
  <h1 className="large text-main">Login</h1>
  <form className="form" onSubmit={e => onSubmit(e)}>
    <div className="form-group">
      <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>
     
    </div>
    <div className="form-group">
      <input
        type="password"
        placeholder="Password"
        name="password"
        minLength="1"
        maxLength={8}
        value={password}
        onChange={e => onChange(e)}
      />
    </div>
    
    <input type="submit" className="btn btn-primary" value="Login" />
  </form>
  <p className="my-1">
    Don't have an account? <Link to="/register">Register</Link>
  </p>
</Fragment>)
};


Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, {login})(Login);