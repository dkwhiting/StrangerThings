import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom"

const Navbar = () => {

  return (
    <div id="navbar">
      <NavLink
        to="profile"
        className="nav-button"
        style={({ isActive }) => ({
          color: isActive ? '#888' : '#ffffff',
          background: isActive ? '#ffffff' : '#888'
        })}>
        Profile</NavLink>
      <NavLink
        to="posts"
        className="nav-button"
        style={({ isActive }) => ({
          color: isActive ? '#888' : '#fff',
          background: isActive ? '#ffffff' : '#888'
        })}>
        Posts
      </NavLink>
      <NavLink
        to="messages"
        className="nav-button"
        style={({ isActive }) => ({
          color: isActive ? '#888' : '#ffffff',
          background: isActive ? '#ffffff' : '#888'
        })}>
        Messages</NavLink>
    </div >
  )
}

export default Navbar;