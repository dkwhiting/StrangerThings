import React from "react";

const Footer = ({ setUser, setToken }) => {

  const clickHandler = () => {
    localStorage.removeItem('token')
    setToken('')
    setUser('')
    console.log("hello")
  }

  return (
    <button onClick={clickHandler}>Logout</button>
  )
}

export default Footer