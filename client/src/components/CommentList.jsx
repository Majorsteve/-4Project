import React from 'react'
import CommentForm from './CommentForm'

export default function CommentList(props) {
  return (
    <div>
      <h1>Comment Lists</h1>
      <div>

        <CommentForm
          handleSubmit={props.handleSubmit}
          topic_id={props.topic_id}
        />

      </div>
      {/* <h2>{props.topic.title}</h2> */}
      {props.comments.map(comment => (
        <div key={comment.id}>
          <div className="container">
            <div className="dialogbox">
              <div className="body">
                <span className="tip tip-up"></span>
                <div className="message"></div>
                <h3>{comment.content}</h3>
                <button onClick={() => props.handleDelete(comment.id)}>Delete</button>
                <button onClick={() => props.setFormData(comment)}>Edit</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
