import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";


const Header = ({ token, user, setUser, setToken }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const createDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const logoutHandler = () => {
    localStorage.removeItem('token')
    setToken('')
    setUser('')
  }



  return (
    <div className="header">
      <h2>Stranger's Things</h2>
      {token
        ? <div className="right">
          <div className="header-username">
            <h3>{user?.username}</h3>
            {showDropdown
              ? <i
                className="	fa fa-chevron-circle-up"
                onClick={() => createDropdown()}></i>
              : <i
                className="	fa fa-chevron-circle-down"
                onClick={() => createDropdown()}></i>}
          </div>
          {showDropdown
            ? <div className="dropdown">
              <ul className="menu">
                <li><NavLink
                  to="profile"
                  className="nav-button"
                  style={({ isActive }) => ({
                    background: isActive ? 'rgb(217, 231, 255)' : ''
                  })}>
                  Profile</NavLink></li>
                <li><button onClick={logoutHandler}>Logout</button></li>
                <li>Dark Mode</li>
              </ul>
            </div>
            : <></>}
        </div>


        : <></>}
    </div>
  )
}

export default Header