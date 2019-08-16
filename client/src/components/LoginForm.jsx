import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {

  return (
    <div className="auth-login">
      <form className="box" onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();}} >
        <p>login</p>
        <p>Username:</p>
        <input
          name="username"
          type="text"
          value={props.formData.username}
          onChange={props.handleChange} />
        <p>Password:</p>
        <input
          name="password"
          type="password"
          value={props.formData.password}
          onChange={props.handleChange} />
        <button className="auth-button">Login</button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
}

export default LoginForm;