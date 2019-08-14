import React from 'react'
import { Route, Link } from 'react-router-dom';
import TopicForm from './TopicForm';
// import { withRouter } from 'react-router';

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      topics: [],
      title: ""
    }
  }

  // componentDidMount() {

  // }


  render() {
    return (
      <div>
        <div>
        <h1>Home Page</h1>
        <Link to="/TopicForm">Create A New Topic</Link>
        {this.state.topics.map(topic => (
          <div key={topic.id}>
            <h3>{topic.title}</h3>
            {/* <Link to={`/dojos/${dojo.id}`}>View More Dojo Info</Link> */}
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
