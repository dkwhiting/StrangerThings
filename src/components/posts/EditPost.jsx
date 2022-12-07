import React, { useState } from "react";
import { editPost } from "../../api/posts";

const EditPost = ({ token, currentPost, setCurrentPost, setAllPosts, posts }) => {
  const [currentTitle, setCurrentTitle] = useState(currentPost.title)
  const [currentDescription, setCurrentDescription] = useState(currentPost.description)
  const [currentPrice, setCurrentPrice] = useState(currentPost.price)
  const [currentLocation, setCurrentLocation] = useState('')
  const [currentWillDeliver, setCurrentWillDeliver] = useState('')

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      let submitEdit = async () => {
        await editPost(token, currentPost._id, currentTitle, currentDescription, currentPrice)
        await setAllPosts([...posts])
        await setCurrentPost(null)
      }
      currentTitle == '' && currentDescription == '' ? console.log('Title and description can not be blank')
        : currentTitle == '' ? console.log('Title can not be blank')
          : currentDescription == '' ? console.log('Description can not be blank')
            : currentPrice == '' ? console.log('Price can not be blank')
              : submitEdit();
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div id="edit-modal">
      <div id="edit-container">
        <div id="edit-header">
          <p>Edit Post</p>
          <button onClick={() => setCurrentPost(null)}>X</button>
        </div>
        <form className="edit-form" onSubmit={submitHandler}>
          <div className="form-container">
            <label htmlFor="title">Title</label>
            <input
              value={currentTitle}
              className="title"
              type="text"
              onChange={(event) => setCurrentTitle(event.target.value)}></input><br />
          </div>
          <div className="form-container">
            <label htmlFor="description">Description</label>
            <input
              value={currentDescription}
              className="description"
              type="text"
              onChange={(event) => setCurrentDescription(event.target.value)}></input><br />
          </div>
          <div className="form-container">
            <label htmlFor="price">Price</label>
            <input
              value={currentPrice}
              className="price"
              type="text"
              onChange={(event) => setCurrentPrice(event.target.value)}></input>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default EditPost;