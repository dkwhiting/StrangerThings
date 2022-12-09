import React, { useState } from "react";

import EditPost from "./EditPost";
import SinglePost from "./SinglePost";

const AllPosts = ({ token, setUpdater, updater, posts, setShowAllPosts }) => {
  const [currentPost, setCurrentPost] = useState(null)

  return (
    <div className="all-posts">
      <h2>All Posts</h2>

      {
        currentPost
          ? <EditPost
            token={token}
            currentPost={currentPost}
            setCurrentPost={setCurrentPost}
            setUpdater={setUpdater} updater={updater}
            posts={posts} />
          : <></>}
      <div className="post-container">
        {
          posts.map((post, index) => {
            return (
              <SinglePost
                key={post._id}
                token={token}
                posts={posts}
                post={post}
                setCurrentPost={setCurrentPost}
                setUpdater={setUpdater} updater={updater}
                index={index} />
            )
          })
        }
      </div>
    </div >
  )
}

export default AllPosts