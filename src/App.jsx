import "./App.css";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"

import Home from './components/Home'
import Profile from './components/Profile'
import PostsView from "./components/posts/PostsView";
import Messages from "./components/Messages";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Header from "./components/Header"
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
    console.log(user)
  }, [token])

  useEffect(() => {
    const getMessages = async () => {
      const data = await fetchMe(token)
      setSentMessages(allMessages.filter((message) => message.fromUser._id == user._id))
      setRecievedMessages(allMessages.filter((message) => message.fromUser._id != user._id))
    }
    if (token) {
      getMessages();
    }
  }, [token, user])


  return (
    <Router>
      <div className="App">

        <Header token={token} user={user} setUser={setUser} setToken={setToken} />
        <Navbar />

        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="profile" element={<Profile token={token} user={user} sentMessages={sentMessages} recievedMessages={recievedMessages} />} />
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
