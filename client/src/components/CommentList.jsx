import React from 'react'
import { Link, Route } from 'react-router-dom'
import { fetchComments, createComment, destroyComment } from '../services/api-helper'

import CommentForm from './CommentForm'
import { async } from 'q';


export default class CommentList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: [],
      content: '',
    }
  }

  async componentDidMount() {
    try {
      const comments = await fetchComments(this.props.topic_id);
      this.setState({
        comments: comments
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleDelete = async (id) => {
    const resp = await destroyComment(id);
    this.setState(prevState => ({
      comments: prevState.comments.filter(comment => comment.id !== id)

    }))
  }

  handleSubmit = async (formData) => {
    const { topic_id } = this.props
    console.log("form", topic_id)
    const resp = await createComment(topic_id, formData);
    console.log(resp)
    this.setState(prevState => ({
      comments: [...prevState.comments, resp]
    }));
    // this.props.history.push(`/topics/${topic.id}/comments`);
  }

  render() {
    //console.log(this.state.comments)
    console.log(this.props)
    return (
      <div>
        {/* <Link to="/CommentForm">Create Comment</Link> */}
        <h1>Comment Lists</h1>
        {/* <h2>{this.props.topic.title}</h2> */}
        {this.state.comments.map(comment => (
          <div key={comment.id}>
            <h3>{comment.content}</h3>
            <button onClick={() => this.handleDelete(comment.id)}>Delete</button>
          </div>
        ))}
        <div>

          <CommentForm
            handleSubmit={this.handleSubmit}
            topic_id={this.props.topic_id}
          />

        </div>
      </div>
    )
  }
}
