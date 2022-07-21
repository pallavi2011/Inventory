import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Register = ({register, isAuthenticated, user}) => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    company:'',
    designation:'',
    qualification:'',
    bio: ''
  });
  const {name, email, password, company, designation, qualification, bio} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
        register({ name, email, password, company, designation, qualification, bio});
  }

  if(isAuthenticated){
    return <Redirect to="/"/>
  }
  return (
  <Fragment>
  <h1 className="large text-main">Register</h1>
  <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
  <form className="form" onSubmit={e => onSubmit(e)}>
    <div className="form-group">
      <input type="text" placeholder="Full Name" name="name" value={name}  onChange={e => onChange(e)}/>
    </div>
    <div className="form-group">
      <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
     
    </div>
    <div className="form-group">
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={e => onChange(e)}
      />
    </div>
    <div className="form-group">
      <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
     
    </div>
    <div className="form-group">
      <input type="text" placeholder="Designation" name="designation" value={designation} onChange={e => onChange(e)} />
     
    </div>
    <div className="form-group">
      <input type="text" placeholder="Qualification" name="qualification" value={qualification} onChange={e => onChange(e)} />
     
    </div>
    <div className="form-group">
      <input type="text" placeholder="Bio" name="bio" value={bio} onChange={e => onChange(e)} />
     
    </div>
    
    <input type="submit" className="btn btn-primary" value="Register" />
  </form>
  <p className="my-1">
    Already have an account? <Link to="/login">Login</Link>
  </p>
</Fragment>)
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired
  
  }
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  })
  
  export default connect(mapStateToProps, { register })(Register);