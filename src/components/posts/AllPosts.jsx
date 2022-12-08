import React, { useState } from "react";

import EditPost from "./EditPost";
import SinglePost from "./SinglePost";

const AllPosts = ({ token, setAllPosts, posts, setShowAllPosts }) => {
  const [currentPost, setCurrentPost] = useState(null)

  return (
    <div className="all-posts">
      <h2>All Posts</h2>
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
          : <></>}
      <div className="post-container">
        {
          posts.map(post => {
            return (
              <SinglePost
                token={token}
                posts={posts}
                post={post}
                setCurrentPost={setCurrentPost}
                setAllPosts={setAllPosts} />
            )
          })
        }
      </div>
    </div >
  )
}

export default AllPosts