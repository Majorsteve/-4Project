import React from 'react';

const RegisterForm = (props) => {

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <hr />
      <form onSubmit={props.handleRegister} >
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
        <button onClick={props.handleLoginButton}>Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;