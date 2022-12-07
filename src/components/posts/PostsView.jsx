import "./Posts.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchPosts } from "../../api/posts";
import NewPost from './NewPost'
import UserPosts from "./UserPosts";
import AllPosts from "./AllPosts";
import EditPost from "./EditPost";

const Posts = ({ token }) => {
  const [posts, setPosts] = useState([])
  const [showAllPosts, setShowAllPosts] = useState(true)
  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts(token);
      setPosts(data.data.posts);
      console.log(posts)
    }
    if (token) {
      getPosts();
    }
  }, [token, allPosts])

  const dateDifference = (now, createdAt) => {
    const difference = (now - createdAt) / 1000 / 60 / 60;
    return (
      difference < 1 ? `${Math.floor(difference * 60)} minutes ago`
        : difference < 2 ? `${Math.floor(difference)} hour ago`
          : difference < 24 ? `${Math.floor(difference)} hours ago`
            : difference < 48 ? `${Math.floor(difference / 24)} day ago`
              : 'days ago'
    )
  }

  return (
    token
      ?
      <div className="container">
        <div className="posts-view">
          {
            showAllPosts
              ? <AllPosts token={token} posts={posts} dateDifference={dateDifference} setAllPosts={setAllPosts} />
              : <UserPosts token={token} posts={posts} dateDifference={dateDifference} setAllPosts={setAllPosts} />
          }
        </div>
        <NewPost token={token} posts={posts} setAllPosts={setAllPosts} />
      </div >
      : <></>
  )
}

export default Posts;