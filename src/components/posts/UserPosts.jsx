import React, { useState, useEffect } from "react";
import EditPost from "./EditPost";
import SinglePost from "./SinglePost";

const UserPosts = ({ token, setAllPosts, posts, setShowAllPosts }) => {
  const [currentPost, setCurrentPost] = useState(null)

  return (
    <div className="all-posts">
      <h2>Your Posts</h2>
      <button className="view-changer" onClick={() => { setAllPosts([...posts]); setShowAllPosts(true) }}>All Posts</button>
      <button className="view-changer" onClick={() => { setAllPosts([...posts]); setShowAllPosts(false) }}>Your Posts</button>
      {
        currentPost
          ? <EditPost
            token={token}
            currentPost={currentPost}
            setCurrentPost={setCurrentPost}
            setAllPosts={setAllPosts}
            posts={posts} />
          : <></>
      }
      <div className="post-container">
        {
          posts.filter((post) => post.isAuthor == true).length > 0
            ? posts.filter((post) => post.isAuthor == true)
              .map(post => {
                return (
                  <SinglePost
                    key={post._id}
                    token={token}
                    posts={posts}
                    post={post}
                    setCurrentPost={setCurrentPost}
                    setAllPosts={setAllPosts} />
                )
              })
            : <p>You have no posts!</p>
        }
      </div>
    </div>
  )
}

export default UserPosts