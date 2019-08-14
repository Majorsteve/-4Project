import React from 'react'
import { createComment } from '../services/api-helper';
import { withRouter } from 'react-router-dom'

class CommentForm extends ReactComp.onent {
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
    const res = await createComment(this.state);
    console.log(res)
    this.setState({
      title: '',
    });
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
            value="Create Comment" />
        </form>
      </div>
    )
  }
}

export default withRouter(CommentForm)
