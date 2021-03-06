import React from 'react';
import { Link } from 'react-router-dom';


const RegisterForm = (props) => {

  return (
    <div className="auth-register">
      <form className="box" onSubmit={props.handleRegister} >
        <p>Username:</p>
        <input
          name="username"
          type="text"
          value={props.formData.username}
          onChange={props.handleChange} />
        <p>Email:</p>
        <input
          name="email"
          type="text"
          value={props.formData.email}
          onChange={props.handleChange} />
        <p>Password:</p>
        <input
          name="password"
          type="password"
          value={props.formData.password}
          onChange={props.handleChange} />
        <hr/>
        <button className= "auth-button"onClick={props.handleLoginButton}>Register</button>
        <Link to="/login">login</Link>
      </form>
    </div>
  );
}

export default RegisterForm;