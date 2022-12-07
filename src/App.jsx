import "./App.css";
import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter as Router,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom"

import Register from './components/Register';
import Posts from "./components/posts/PostsView";
import Footer from "./components/Footer";
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
    <div className="App">
      <header>
        <h2>Logo</h2>
        {token
          ? <h2>Welcome, {user?.username}</h2>
          : <Register token={token} setToken={setToken} />}
      </header>
      <main>

        <Posts token={token} />
      </main>
      <footer>
        <Footer setUser={setUser} setToken={setToken} />
      </footer>
    </div>
  )
}

export default App;
