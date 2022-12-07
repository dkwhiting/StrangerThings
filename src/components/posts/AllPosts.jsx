import React, { useState, useEffect } from "react";
import { deletePost } from "../../api/posts";
import EditPost from "./EditPost";

const AllPosts = ({ token, setAllPosts, posts, dateDifference }) => {
  const [currentPost, setCurrentPost] = useState(null)


  const deleteHandler = (event) => {
    event.preventDefault();
    const postId = event.target.className.split(' ')[2]
    deletePost(token, postId)
    setAllPosts([...posts])
  }

  return (

    <div className="all-posts">
      <h2>All Posts</h2>
      {currentPost ? <EditPost token={token} currentPost={currentPost} setCurrentPost={setCurrentPost} setAllPosts={setAllPosts} posts={posts} /> : <></>}
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
                  {post.isAuthor
                    ? <div className="header-buttons">
                      <i className={`fa-solid fa-pen-to-square ${post._id}`} onClick={() => { setCurrentPost(post) }}></i>
                      <i className={`fa-solid fa-trash-can ${post._id}`} onClick={deleteHandler}></i>
                    </div>
                    : <></>}
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