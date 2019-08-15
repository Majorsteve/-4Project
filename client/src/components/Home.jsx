import React from 'react'
import { Route, Link } from 'react-router-dom';
import TopicForm from './TopicForm';
import { fetchTopics, destroyTopic } from '../services/api-helper';
// import { withRouter } from 'react-router';

export default class Home extends React.Component {
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

  render() {
    return (
      <div>
        <div>
          <h1>Home Page</h1>
          <Link to="/TopicForm">Create A New Topic</Link>
          {this.state.topics.map(topic => (
            <Link to={`/topics/${topic.id}/comments`}>
              <div key={topic.id}>
                <h3>{topic.title}</h3>
                <button onClick={() => this.deleteTopic(topic.id)}>Delete</button>
              </div>
            </Link>
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
