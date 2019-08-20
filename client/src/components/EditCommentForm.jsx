import React from 'react'

export default function EditCommentForm(props) {
  return (
    <div>
      <h3>Edit Form</h3>
      <form onSubmit={props.handleCommentSubmit}>
        <label
          htmlFor="content">Comment</label>
        <input
          type="text"
          onChange={props.handleChange}
          value={props.formData.content}
          id="content"
          name="content"
        />
        <button>Submit</button>
      </form>
    </div>
  )
}

