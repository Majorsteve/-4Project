import React from 'react'
// import { createComment } from '../services/api-helper';
import { withRouter } from 'react-router-dom'

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
    }
  }

  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <form onSubmit={(ev) => {
          ev.preventDefault();
          this.props.handleSubmit(this.state)
        }}>
          <label htmlFor="name">Submit</label>
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
