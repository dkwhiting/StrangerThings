import React, { useState, useEffect } from "react";
import EditPost from "./EditPost";
import SinglePost from "./SinglePost";

const FavoritePosts = ({ token, setUpdater, updater, posts, setShowAllPosts }) => {
  const [currentPost, setCurrentPost] = useState(null)

  return (
    <div className="all-posts">
      <h2>Your Posts</h2>

      {
        currentPost
          ? <EditPost
            token={token}
            currentPost={currentPost}
            setCurrentPost={setCurrentPost}
            setUpdater={setUpdater} updater={updater}
            posts={posts} />
          : <></>
      }
      <div className="post-container">
        {
          posts.filter((post) => post.isAuthor == true).length > 0
            ? posts.filter((post) => post.isAuthor == true)
              .map((post, index) => {
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
            : <p>You have no posts!</p>
        }
      </div>
    </div>
  )
}

export default FavoritePosts