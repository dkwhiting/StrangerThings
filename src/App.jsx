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
  const [allMessages, setAllMessages] = useState([])
  const [sentMessages, setSentMessages] = useState([])
  const [recievedMessages, setRecievedMessages] = useState([])

  useEffect(() => {
    const getMe = async () => {
      const data = await fetchMe(token);
      setUser(data.data)
      setAllMessages(data.data.messages)
    }
    if (token) {
      getMe();

    }
  }, [token])

  useEffect(() => {
    const getMessages = async () => {
      const data = await fetchMe(token)
      setSentMessages(allMessages.filter((message) => message.fromUser._id == user._id))
      setRecievedMessages(allMessages.filter((message) => message.fromUser._id != user._id))
      console.log(user)
      console.log(recievedMessages)
      console.log(sentMessages)
    }
    if (token) {
      getMessages();
    }
  }, [token, user])


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
            <Route path="messages" element={<Messages sentMessages={sentMessages} recievedMessages={recievedMessages} />} />
            <Route path="posts/*" element={<PostsView token={token} />} />

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
