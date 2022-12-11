import React, { useState } from "react";
import { newPost } from "../../api/posts";

const NewPost = ({ token, posts, setUpdater, updater }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [willDeliver, setWillDeliver] = useState(false)

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      let submitPost = async () => {
        await newPost(token, title, description, price, location, willDeliver)
      }
      title == '' && description == '' ? console.log('Title and description can not be blank')
        : title == '' ? console.log('Title can not be blank')
          : description == '' ? console.log('Description can not be blank')
            : price == '' ? console.log('Price can not be blank')
              : submitPost();
      setTitle('')
      setDescription('')
      setPrice('')
      setLocation('')
      setWillDeliver(false)
    } catch (error) {
      console.log(error)
    }
    setUpdater(!updater)
  }

  return (
    <div id="new-post">
      <div className='new-post-header'>
        <h2>New Post</h2>
      </div>
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
        <div className="form-container">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            className="location"
            type="text"
            onChange={(event) => setLocation(event.target.value)}></input>
        </div>
        <div className="form-container">
          <div className="delivery">
            <label htmlFor="will-deliver">Will Deliver?</label>
            <input
              checked={willDeliver}
              className="will-deliver"
              type="checkbox"
              onChange={(event) => { setWillDeliver(event.target.checked) }}></input>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NewPost