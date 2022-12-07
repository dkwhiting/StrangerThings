import "../Posts.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchPosts, deletePost } from "../api/posts";
import NewPost from './NewPost'
import UserPosts from "./UserPosts";
import AllPosts from "./AllPosts";

const Posts = ({ token }) => {
  const [posts, setPosts] = useState([])
  const [showAllPosts, setShowAllPosts] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts(token);
      setPosts(data.data.posts);
    }
    if (token) {
      getPosts();
    }
  }, [token, posts])

  const dateDifference = (now, createdAt) => {
    const difference = (now - createdAt) / 1000 / 60 / 60;
    return (
      difference < 24
        ? `${Math.floor(difference)} hours ago`
        : `${Math.floor(difference / 24)} ${difference < 48 ? 'day' : 'days'} ago`
    )
  }



  return (
    token
      ?
      <div className="container">
        <div className="posts-view">
          {
            showAllPosts
              ? <AllPosts posts={posts} dateDifference={dateDifference} />
              : <UserPosts posts={posts} dateDifference={dateDifference} />
          }
        </div>
        <NewPost />
      </div >
      : <></>
  )
}

export default Posts;