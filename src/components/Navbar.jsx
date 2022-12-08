import React from "react";
import { Link, NavLink } from "react-router-dom"

const Navbar = () => {

  return (
    <div id="navbar">
      <NavLink to="profile"><button>Profile</button></NavLink>
      <NavLink to="posts"><button>Posts</button></NavLink>
      <NavLink to="messages"><button>Messages</button></NavLink>
    </div>
  )
}

export default Navbar;