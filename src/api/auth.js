const APIURL = 'https://strangers-things.herokuapp.com/api/2211-FTB-ET-WEB-FT/'

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${APIURL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    })
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error)
  }
}

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${APIURL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    })
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchMe = async (token) => {
  try {
    const response = await fetch(`${APIURL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error)
  }
}
