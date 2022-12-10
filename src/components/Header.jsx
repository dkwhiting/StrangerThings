import React, { useState } from "react";

const Header = ({ token, user, setUser, setToken }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const createDropdown = () => {
    setShowDropdown(!showDropdown)
    console.log('dropdown')
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
          <h3>{user?.username}</h3>
          {showDropdown
            ? <i
              className="	fa fa-chevron-circle-up"
              onClick={() => createDropdown()}></i>
            : <i
              className="	fa fa-chevron-circle-down"
              onClick={() => createDropdown()}></i>}
        </div>


        : <Register token={token} setToken={setToken} />}
    </div>
  )
}

export default Header