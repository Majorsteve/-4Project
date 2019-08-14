import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
// import decode from 'jwt-decode';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home'
import TopicForm from './components/TopicForm'

import {
  loginUser,
  registerUser,
  verifyUser,
} from './services/api-helper'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      currentUser: null,
      authFormData: {
        username: "",
        email: "",
        password: ""
      },
      topics: []
    }
  }


  //Authticate
  componentDidMount = async () => {
    // this.getTeachers();
    const user = await verifyUser();
    if (user) {
      this.setState({
        currentUser: user
      })
    }
  }

  handleLoginButton = (ev) => {
    ev.preventDefault();
  }

  handleLogin = async () => {
    const userData = await loginUser(this.state.authFormData);
    this.setState({
      currentUser: userData
    })
    this.props.history.push("/")
  }

  handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
  }

  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
  }

  authHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1><Link to='/' onClick={() => this.setState({
            teacherForm: {
              name: "",
              photo: ""
            }
          })}>Home</Link></h1>
          <div>
            {this.state.currentUser
              ?
              <>
                <p>{this.state.currentUser.username}</p>
                <button onClick={this.handleLogout}>logout</button>
              </>
              :
              <button onClick={this.handleLoginButton}>Login/register</button>
            }
          </div>
        </header>
        <div className="Auth">
          <Route exact path="/login" render={() => (
            <LoginForm
              handleLogin={this.handleLogin}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData} />)} />
          <Route exact path="/register" render={() => (
            <RegisterForm
              handleRegister={this.handleRegister}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData} />)} />
        </div>
        <Route exact path="/" render={() => (
          <Home />)} />
        <div>
          <Route exact path="/TopicForm" render={() => (
            <TopicForm
              currentUser={this.state.currentUser}
            />)} />

        </div>

      </div>
    );
  }
}

export default withRouter(App);