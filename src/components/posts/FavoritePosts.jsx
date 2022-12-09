import React, { useState, useEffect } from "react";
import EditPost from "./EditPost";
import SinglePost from "./SinglePost";

const FavoritePosts = ({ token, setUpdater, updater, posts, favorite, setFavorite, postIndex, setPostIndex }) => {
  const [currentPost, setCurrentPost] = useState(null)
  return (
    <div className="all-posts">
      <h2>Favorite Posts</h2>

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
          favorite && favorite.length > 0
            ? posts.filter(post => favorite.includes(post._id))
              .map((post, index) => {
                return (
                  <SinglePost
                    key={post._id}
                    token={token}
                    posts={posts}
                    post={post}
                    setCurrentPost={setCurrentPost}
                    setUpdater={setUpdater} updater={updater}
                    index={index}
                    favorite={favorite}
                    setFavorite={setFavorite}
                    postIndex={postIndex}
                    setPostIndex={setPostIndex}
                  />
                )
              })
            : <p>You have no favorites!</p>
        }
      </div>
    </div>
  )
}

export default FavoritePosts