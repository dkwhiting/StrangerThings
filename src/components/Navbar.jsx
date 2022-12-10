import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom"

const Navbar = () => {

  return (
    <div id="navbar">
      <NavLink
        to="profile"
        className="nav-button"
        style={({ isActive }) => ({
          background: isActive ? 'rgb(217, 231, 255)' : ''
        })}>
        Profile</NavLink>
      <NavLink
        to="posts"
        className="nav-button"
        style={({ isActive }) => ({
          background: isActive ? 'rgb(217, 231, 255)' : ''
        })}>
        Posts
      </NavLink>
      <NavLink
        to="messages"
        className="nav-button"
        style={({ isActive }) => ({
          background: isActive ? 'rgb(217, 231, 255)' : ''
        })}>
        Messages</NavLink>
    </div >
  )
}

export default Navbar;