import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom"

const Navbar = ({ token }) => {

  return (
    <div id="navbar">
      {token
        ? <>
          <NavLink
            to="home"
            className="nav-button"
            style={({ isActive }) => ({
              background: isActive ? 'rgb(217, 231, 255)' : ''
            })}>
            Home</NavLink>
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
        </>
        : <></>}

    </div >
  )
}

export default Navbar;