import React from 'react'
import { createComment } from '../services/api-helper';
import { withRouter } from 'react-router-dom'

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({
      [name]: value,
    });
  }

  submit = async (ev) => {
    ev.preventDefault();
    const resp = await createComment(this.state);
    console.log(resp)
    this.setState({
      title: '',
    });
    // this.props.history.push('/topics/:topic_id/comments');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label htmlFor="name">Comments</label>
          <input
            type="text"
            name="content"
            id="name"
            onChange={this.handleChange} />
          <input
            type="submit"
            value="Create" />
        </form>
        
      </div>

    )
  }
}

export default withRouter(CommentForm)
