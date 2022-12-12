import React, { useState, useEffect } from "react";
import { registerUser, loginUser } from '../api/auth'

const Register = ({ setToken, token, guestLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginToggle, setLoginToggle] = useState(false)
  const [loginError, setLoginError] = useState('')

  const submitHandler = async (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
    if (!loginToggle) {
      setLoginError('User already registered, please select a different username')
      const response = await registerUser(username, password);
      const token = response.data.token;
      setToken(token)
      localStorage.setItem('token', token);
      console.log(loginToggle)
    } else {
      setLoginError('Incorrect username/password, please try again')
      const response = await loginUser(username, password);
      const token = response.data.token;
      setToken(token)
      localStorage.setItem('token', token);
      console.log(loginToggle)
    }
  }

  return (
    <div>
      {
        !token || !guestLogin
          ?
          <div className='register'>
            <h2>Please register or sign in</h2>
            {loginError != '' ? <p className="error">{loginError}</p> : <></>}
            <form onSubmit={submitHandler}>
              <input value={username} type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)}></input>
              <input value={password} type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)}></input>
              <div className="register-buttons">
                <button type="submit" onClick={() => setLoginToggle(true)}>Login</button>
                <button type="submit" onClick={() => setLoginToggle(false)}>Register</button>
              </div>
            </form>
          </div>
          : <></>
      }
    </div>
  )
}

export default Register;