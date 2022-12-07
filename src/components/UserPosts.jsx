import React, { useState, useEffect } from "react";

const UserPosts = ({ user, posts, dateDifference }) => {

  const clickHandler = (event) => {
    console.log(event.target.className.split(' ')[1])

  }

  return (
    <div className="all-posts">
      <h2>Your Posts</h2>
      {
        posts.filter((post) => post.isAuthor == true)
          .map(post => {
            const todaysDate = new Date()
            const createdAt = new Date(post.createdAt)
            // console.log(post.messages.length)
            return (
              <div className="single-post" key={post._id}>
                <div className="post-header">
                  <div className="post-user">{post.author.username}</div>
                  {post.isAuthor
                    ? <div>
                      <button className={`edit ${post._id}`} onClick={clickHandler}><i className="fa-solid fa-pen-to-square"></i></button>
                      <button className="delete" onClick={clickHandler}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                    : <></>}
                </div>
                <div className="post-time">{dateDifference(todaysDate, createdAt)}</div>
                <div className="post-title">{post.title}</div>
                <div className="post-description">{post.description}</div>
                <div className="post-description">{post.isAuthor}</div>
                <div className="post-messages">{post.messages.length} messages</div>

              </div>
            )
          })
      }
    </div>
  )
}

export default UserPosts