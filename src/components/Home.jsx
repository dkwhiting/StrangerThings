import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {

  return (
    <div className="home">
      <h1>Homepage</h1>
      <Outlet />
    </div>
  )
}

export default Home;