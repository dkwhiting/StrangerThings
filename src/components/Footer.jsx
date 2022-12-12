
import React, { useEffect, useState } from "react";

const Footer = ({ setUser, setToken }) => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    })
  }, [])

  const clickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div>
      {showBackToTop
        ? <button onClick={() => clickHandler()}>Return to top of page</button>
        : <></>}
    </div>
  )
}

export default Footer