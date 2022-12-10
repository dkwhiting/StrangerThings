import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import EditPost from "./EditPost";
import SinglePost from "./SinglePost";

const AllPosts = ({ token, setUpdater, updater, posts, favorite, setFavorite, userSearch, descriptionSearch }) => {
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
          posts.filter(post => post.author.username.toLowerCase().includes(userSearch.toLowerCase()))
            .filter(post => post.description.toLowerCase().includes(descriptionSearch.toLowerCase()) || post.title.toLowerCase().includes(descriptionSearch.toLowerCase()))
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
                />
              )
            })
        }
      </div>
      <Outlet />
    </div >
  )
}

export default AllPosts