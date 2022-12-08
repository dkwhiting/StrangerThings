import "./App.css";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom"

import Register from './components/Register';
import Home from './components/Home'
import Profile from './components/Profile'
import PostsView from "./components/posts/PostsView";
import Messages from "./components/Messages";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { fetchMe } from './api/auth';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({})

  useEffect(() => {
    const getMe = async () => {
      const data = await fetchMe(token);
      setUser(data.data)
    }
    if (token) {
      getMe();
    }
  }, [token])

  return (
    <Router>
      <div className="App">

        <div className="header">
          <h2>Logo</h2>
          {token
            ? <h2>Welcome, {user?.username}</h2>
            : <Register token={token} setToken={setToken} />}
        </div>
        <Navbar />

        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="profile" element={<Profile token={token} />} />
            <Route path="messages" element={<Messages token={token} />} />
            <Route path="posts" element={<PostsView token={token} />} />

          </Routes>
        </div>

        <div className="footer">
          <Footer setUser={setUser} setToken={setToken} />
        </div>
      </div>
    </Router>
  )
}

export default App;
