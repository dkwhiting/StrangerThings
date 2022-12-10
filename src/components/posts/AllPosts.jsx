import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import EditPost from "./EditPost";
import SinglePost from "./SinglePost";

const AllPosts = ({ token, setUpdater, updater, posts, favorite, setFavorite, postIndex, setPostIndex }) => {
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
                index={index}
                favorite={favorite}
                setFavorite={setFavorite}
                postIndex={postIndex}
                setPostIndex={setPostIndex} />
            )
          })
        }
      </div>
      <Outlet />
    </div >
  )
}

export default AllPosts