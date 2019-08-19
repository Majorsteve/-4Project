import React from 'react'
import CommentForm from './CommentForm'
import {
  fetchComments,
  createComment,
  destroyComment
} from '../services/api-helper'


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
    const resp = await createComment(topic_id, formData);
    this.setState(prevState => ({
      comments: [...prevState.comments, resp]
    }));
  }

  render() {
    return (
      <div>
        <h1>Comment Lists</h1>
        <div>

          <CommentForm
            handleSubmit={this.handleSubmit}
            topic_id={this.props.topic_id}
          />

        </div>
        {/* <h2>{this.props.topic.title}</h2> */}
        {this.state.comments.map(comment => (
          <div key={comment.id}>
            <div className="container">
              <div className="dialogbox">
                <div className="body">
                  <span className="tip tip-up"></span>
                  <div className="message"></div>
                  <h3>{comment.content}</h3>
                  <button onClick={() => this.handleDelete(comment.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
