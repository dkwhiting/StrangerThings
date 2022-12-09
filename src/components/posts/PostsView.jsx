import "./Posts.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { fetchPosts } from "../../api/posts";
import NewPost from './NewPost'
import UserPosts from "./UserPosts";
import AllPosts from "./AllPosts";
import FilterBar from "./FilterBar";
import FavoritePosts from "./FavoritePosts";

const PostsView = ({ token }) => {
  const [posts, setPosts] = useState([])
  const [updater, setUpdater] = useState(true)
  const [favorite, setFavorite] = useState(() => {
    return localStorage.getItem('favorites')
      ? JSON.parse(localStorage.getItem('favorites')).favorites
      : []
  }
  )
  const [postIndex, setPostIndex] = useState(null)


  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts(token);
      setPosts(data.data.posts);
    }
    if (token) {
      getPosts();


    }
  }, [token, updater])



  return (
    token
      ?
      <div className="container">
        <FilterBar
          setUpdater={setUpdater}
          updater={updater}
        />
        <div className="posts-view">
          <Routes>

            <Route path="all" element={<AllPosts
              token={token}
              posts={posts}
              setUpdater={setUpdater}
              updater={updater}
              favorite={favorite}
              setFavorite={setFavorite}
              postIndex={postIndex}
              setPostIndex={setPostIndex} />} />
            <Route path="user" element={<UserPosts
              token={token}
              posts={posts}
              setUpdater={setUpdater}
              updater={updater}
              favorite={favorite}
              setFavorite={setFavorite}
              postIndex={postIndex}
              setPostIndex={setPostIndex} />} />
            <Route path="favorites" element={<FavoritePosts
              token={token}
              posts={posts}
              setUpdater={setUpdater}
              updater={updater}
              favorite={favorite}
              setFavorite={setFavorite}
              postIndex={postIndex}
              setPostIndex={setPostIndex} />} />

          </Routes>
        </div>
        <NewPost token={token} posts={posts} setUpdater={setUpdater} />
      </div >
      : <></>
  )
}

export default PostsView;