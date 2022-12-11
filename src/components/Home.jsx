import React from "react";
import { Outlet } from "react-router-dom";
import UserPosts from "./posts/UserPosts";

const Home = ({ user }) => {

  return (
    <div className="home">
      <h1>Welcome {user.username}</h1>
      <Outlet />
    </div>
  )
}

export default Home;