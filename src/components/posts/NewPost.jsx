import React, { useState } from "react";
import { newPost } from "../../api/posts";

const NewPost = ({ token, posts, setUpdater, updater }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      let submitPost = async () => {
        await newPost(token, title, description, price)
        setUpdater(!updater)
      }
      title == '' && description == '' ? console.log('Title and description can not be blank')
        : title == '' ? console.log('Title can not be blank')
          : description == '' ? console.log('Description can not be blank')
            : price == '' ? console.log('Price can not be blank')
              : submitPost();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id="new-post">
      <h2>New Post</h2>
      <form onSubmit={submitHandler}>
        <div className="form-container">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            className="title"
            type="text"
            onChange={(event) => setTitle(event.target.value)}></input>
        </div>
        <div className="form-container">
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            className="description"
            type="text"
            rows="10"
            onChange={(event) => setDescription(event.target.value)}></textarea>
        </div>
        <div className="form-container">
          <label htmlFor="price">Price</label>
          <input
            value={price}
            className="price"
            type="text"
            onChange={(event) => setPrice(event.target.value)}></input>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NewPost