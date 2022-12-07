import React, { useState, useEffect } from "react";

const AllPosts = ({ posts, dateDifference }) => {


  return (
    <div className="all-posts">
      <h2>All Posts</h2>
      <div className="post-container">
        {
          posts.map(post => {
            const todaysDate = new Date()
            const createdAt = new Date(post.createdAt)
            // console.log(post.messages.length)
            return (
              <div className="single-post" key={post._id}>
                <div className="post-header">
                  <div className="post-user">{post.author.username}</div>
                  {post.isAuthor ? <div><button><i className="fa-solid fa-pen-to-square"></i></button><button><i className="fa-solid fa-trash-can"></i></button></div> : <></>}
                </div>
                <div className="post-time">{dateDifference(todaysDate, createdAt)}</div>
                <div className="post-title">{post.title}</div>
                <div className="post-description">{post.description}</div>
                <div className="post-messages">{post.messages.length} messages</div>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllPosts