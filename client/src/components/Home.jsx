import React from 'react'
import { Route, Link, withRouter } from 'react-router-dom';
import TopicForm from './TopicForm';
import { fetchTopics, destroyTopic } from '../services/api-helper';
// import { withRouter } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      topics: [],
      title: ""
    }
  }

  async componentDidMount() {
    try {
      const topics = await fetchTopics();
      this.setState({
        topics
      });
    } catch (e) {
      console.log(e);
    }
  }

  deleteTopic = async (id) => {
    const resp = await destroyTopic(id);
    this.setState(prevState => ({
      topics: prevState.topics.filter(el => el.id !== id),
    }));
  }

  commentsLink = (id) => {
    this.props.fetchComments(id);
    this.props.history.push(`/topics/${id}/comments`)
  }

  render() {
    return (
      <div>
        <div className="Home">
          <h1>Home Page</h1>
          <div className="create-topic">
            <Link to="/TopicForm">Create A New Topic</Link>
          </div>
          {this.state.topics.map(topic => (
            <div key={topic.id}>
              <div className="topic-list">
                <h3 onClick={() => this.commentsLink(topic.id)}>{topic.title}</h3>
                <button onClick={() => this.deleteTopic(topic.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Route exact path="/Home" render={() => (
            <TopicForm />)} />

        </div>
      </div>
    )
  }
}

export default withRouter(Home)