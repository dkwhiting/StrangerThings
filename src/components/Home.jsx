import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Register from "./Register";
const Home = ({ user, setToken, token, guestLogin, setGuestLogin, updater, setUpdater }) => {

  return (
    <div className="home">
      {token
        ? <h1>Welcome {user.username}</h1>
        : <div className="home-register">
          <Register token={token} setToken={setToken} guestLogin={guestLogin} />
          OR
          <NavLink to="posts">
            <button onClick={() => { setUpdater(!updater) }}>View posts as a guest</button>
          </NavLink>
        </div>
      }

      <Outlet />
    </div>
  )
}

export default Home;