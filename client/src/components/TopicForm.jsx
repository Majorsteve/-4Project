import React from 'react'
import { createTopic } from '../services/api-helper'
import { withRouter } from 'react-router-dom'

class TopicForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }


  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({
      [name]: value,
    });
  }

  submit = async (ev) => {
    ev.preventDefault();
    const res = await createTopic(this.state);
    console.log(res)
    this.setState({
      title: '',
    });
    this.props.history.push('/');
  }

  render() {
    // console.log(this.state.)
    return (
      <>
        <form onSubmit={this.submit}>
          <label htmlFor="name">Topic</label>
          <input
            type="text"
            name="title"
            id="name"
            onChange={this.handleChange} />
          <input
            type="submit"
            value="Create Topic" />
        </form>
      </>
    );
  }
}

export default withRouter(TopicForm)