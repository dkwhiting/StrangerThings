import "./Posts.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
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
  const [searchActive, setSearchActive] = useState(false)
  const [userSearch, setUserSearch] = useState('')
  const [descriptionSearch, setDescriptionSearch] = useState('')
  const [favorite, setFavorite] = useState(() => {
    return localStorage.getItem('favorites')
      ? JSON.parse(localStorage.getItem('favorites')).favorites
      : []
  }
  )


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
          searchActive={searchActive}
          setSearchActive={setSearchActive}
          userSearch={userSearch}
          setUserSearch={setUserSearch}
          descriptionSearch={descriptionSearch}
          setDescriptionSearch={setDescriptionSearch}
        />
        <div className="posts-view">
          <Routes>
            <Route index element={<Navigate to="all" replace={true} />} />
            <Route path="all" element={<AllPosts
              token={token}
              posts={posts}
              setUpdater={setUpdater}
              updater={updater}
              favorite={favorite}
              setFavorite={setFavorite}
              searchActive={searchActive}
              setSearchActive={setSearchActive}
              userSearch={userSearch}
              descriptionSearch={descriptionSearch} />} />
            <Route path="user" element={<UserPosts
              token={token}
              posts={posts}
              setUpdater={setUpdater}
              updater={updater}
              favorite={favorite}
              setFavorite={setFavorite}
              searchActive={searchActive}
              setSearchActive={setSearchActive}
              userSearch={userSearch}
              descriptionSearch={descriptionSearch} />} />
            <Route path="favorites" element={<FavoritePosts
              token={token}
              posts={posts}
              setUpdater={setUpdater}
              updater={updater}
              favorite={favorite}
              setFavorite={setFavorite}
              searchActive={searchActive}
              setSearchActive={setSearchActive}
              userSearch={userSearch}
              descriptionSearch={descriptionSearch} />} />

          </Routes>
        </div>
        <NewPost token={token} posts={posts} setUpdater={setUpdater} />
        <Outlet />
      </div >
      : <></>
  )
}

export default PostsView;