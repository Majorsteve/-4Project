import React from 'react'

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
      const topics = await fetchComments();
      this.setState({
        topics
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <h1>Comment Lists</h1>
      </div>
    )
  }
}
