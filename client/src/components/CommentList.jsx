import React from 'react'
import { Link, Route } from 'react-router-dom'
import { fetchComments } from '../services/api-helper'
import { withRouter } from 'react-router-dom'
import CommentForm from './CommentForm'


 export default class CommentList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: [],
      content: ''
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

  render() {
    console.log(this.state.comments)
    console.log(this.props)
    return (
      <div>
        <Link to="/CommentForm">Create Comment</Link>
        <h1>Comment Lists</h1>
        {this.state.comments.map(comment => (
          <div key={comment.id}>
            <h3>{comment.content}</h3>
          </div>
        ))}
      </div>
    )
  }
}
