import React, { useState, useEffect } from "react";
import { deletePost } from "../api/posts";

const UserPosts = ({ token, setPosts, posts, dateDifference }) => {

  const deleteHandler = async (event) => {
    event.preventDefault();
    const postId = event.target.className.split(' ')[2]
    let deleteClick = await deletePost(token, postId)
    setPosts = [...posts]
  }



  return (
    <div className="all-posts">
      <h2>Your Posts</h2>
      {
        posts.filter((post) => post.isAuthor == true).length > 0
          ? posts.filter((post) => post.isAuthor == true)
            .map(post => {
              const todaysDate = new Date()
              const createdAt = new Date(post.createdAt)
              // console.log(post.messages.length)
              return (
                <div className="single-post" key={post._id}>
                  <div className="post-header">
                    <div className="post-user">{post.author.username}</div>
                    <div className="header-buttons">
                      <i className={`fa-solid fa-pen-to-square ${post._id}`}></i>
                      <i className={`fa-solid fa-trash-can ${post._id}`} onClick={deleteHandler}></i>
                    </div>
                  </div>
                  <div className="post-time">{dateDifference(todaysDate, createdAt)}</div>
                  <div className="post-title">{post.title}</div>
                  <div className="post-description">{post.description}</div>
                  <div className="post-messages">{post.messages.length} messages</div>
                </div>
              )
            })
          : <p>You have no posts!</p>
      }
    </div>
  )
}

export default UserPosts