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
    }
    if (token) {
      getPosts();
    }
  }, [token, allPosts])



  return (
    token
      ?
      <div className="container">
        <div className="posts-view">
          {
            showAllPosts
              ? <AllPosts
                token={token}
                posts={posts}
                setAllPosts={setAllPosts}
                setShowAllPosts={setShowAllPosts} />
              : <UserPosts
                token={token}
                posts={posts}
                setAllPosts={setAllPosts}
                setShowAllPosts={setShowAllPosts} />
          }
        </div>
        <NewPost token={token} posts={posts} setAllPosts={setAllPosts} />
      </div >
      : <></>
  )
}

export default Posts;