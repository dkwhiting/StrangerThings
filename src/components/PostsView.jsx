import "../Posts.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchPosts } from "../api/posts";
import NewPost from './NewPost'
import UserPosts from "./UserPosts";
import AllPosts from "./AllPosts";
import EditPost from "./EditPost";

const Posts = ({ token }) => {
  const [posts, setPosts] = useState([])
  const [showAllPosts, setShowAllPosts] = useState(true)
  const [allPosts, setAllPosts] = useState([])
  const [editVisible, setEditVisible] = useState(false)
  const [currentEdit, setCurrentEdit] = useState(null)

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts(token);
      setPosts(data.data.posts);
      console.log(posts)
    }
    if (token) {
      getPosts();
    }
  }, [token])

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
            editVisible
              ? <EditPost setEditVisible={setEditVisible} currentEdit={currentEdit} />
              : showAllPosts
                ? <AllPosts token={token} posts={posts} setShowAllPosts={setPosts} dateDifference={dateDifference} setAllPosts={setAllPosts} allPosts={allPosts} setPosts={setPosts} />
                : <UserPosts token={token} posts={posts} setPosts={setPosts} dateDifference={dateDifference} setAllPosts={setAllPosts} />
          }
        </div>
        <NewPost token={token} posts={posts} setPosts={setPosts} />
      </div >
      : <></>
  )
}

export default Posts;