import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import TopicForm from './components/TopicForm';
import CommentList from './components/CommentList';
import EditCommentForm from './components/EditCommentForm'
import {
  loginUser,
  registerUser,
  verifyUser,
  editComment,
  fetchComments,
  createComment,
  destroyComment,
} from './services/api-helper'
// import CommentForm from './components/CommentForm';

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
      topics: [],
      comments: [],
      commentFormData: {
        content: ""
      }
    }
  }

  // --------------------- comments ----------------------

  fetchComments = async (id) => {
    const comments = await fetchComments(id);
    this.setState({
      comments: comments,
      topic_id: id
    });
  }

  handleSubmit = async (formData) => {
    const { topic_id } = this.state
    const resp = await createComment(topic_id, formData);
    this.setState(prevState => ({
      comments: [...prevState.comments, resp]
    }));
  }

  handleDelete = async (id) => {
    const resp = await destroyComment(id);
    this.setState(prevState => ({
      comments: prevState.comments.filter(comment => comment.id !== id)
    }))
  }


  setFormData = (comment) => {
    this.setState({
      commentFormData: comment
    })
    this.props.history.push("/EditCommentForm")
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      commentFormData: {
        ...prevState.commentFormData,
        [name]: value
      }
    }));
  }

  handleCommentSubmit = async (e) => {
    e.preventDefault()
    const { commentFormData } = this.state;
    const updatedComment = await editComment(commentFormData.id, commentFormData)
    this.setState(prevState => ({
      comments: prevState.comments.map(comment => comment.id === commentFormData.id ? updatedComment : comment)
    }))
    this.props.history.push(`/topics/${this.state.topic_id}/comments`)
  }


  //Authticate
  componentDidMount = async () => {
    const user = await verifyUser();
    if (user) {
      this.setState({
        currentUser: user
      })
    }
  }


  // --------------------- AUTH ----------------------
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
    localStorage.removeItem("authToken");
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
            // teacherForm: {
            //   name: "",
            //   photo: ""
            // }
          })}>Forget it</Link></h1>
          <div>
            {this.state.currentUser
              ?
              <div className="name-button">
                <p>{this.state.currentUser.username}</p>
                <button className="login-button" onClick={this.handleLogout}>logout</button>
              </div>
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
          <Home
            fetchComments={this.fetchComments}
          />)} />

        <Route exact path="/topics/:topic_id/comments" render={(props) => {
          const topic_id = props.match.params.topic_id
          return <CommentList
            handleSubmit={this.handleSubmit}
            topic_id={topic_id}
            setFormData={this.setFormData}
            handleDelete={this.handleDelete}
            comments={this.state.comments}
          />
        }} />
        <div>

          <Route exact path="/TopicForm" render={() => (
            <TopicForm
              currentUser={this.state.currentUser}
            />)} />
          <Route exact path="/EditCommentForm" render={(props) => (
            <EditCommentForm
              handleCommentSubmit={this.handleCommentSubmit}
              formData={this.state.commentFormData}
              handleChange={this.handleChange}
            />

          )} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);