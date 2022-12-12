import "./App.css";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate
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
  const [updater, setUpdater] = useState(true)
  const [allMessages, setAllMessages] = useState([])
  const [sentMessages, setSentMessages] = useState([])
  const [recievedMessages, setRecievedMessages] = useState([])
  const [guestLogin, setGuestLogin] = useState(false)

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

        <div className="content">

          <Navbar token={token} />
          <Routes>
            <Route path="/*" element={<Home user={user} token={token} setToken={setToken} guestLogin={guestLogin} setGuestLogin={setGuestLogin} updater={setUpdater} setUpdater={setUpdater} />} />
            <Route path="posts/*" element={<PostsView token={token} guestLogin={guestLogin} updater={updater} setUpdater={setUpdater} />} />
            {token ? <Route path="profile" element={<Profile token={token} user={user} sentMessages={sentMessages} recievedMessages={recievedMessages} />} /> : <></>}
            {token ? <Route path="messages" element={<Messages sentMessages={sentMessages} recievedMessages={recievedMessages} />} /> : <></>}

          </Routes>
        </div>

        <div className="footer">
          <Footer setUser={setUser} setToken={setToken} />
        </div>


      </div>
    </Router >
  )
}

export default App;
