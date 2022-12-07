const APIURL = 'https://strangers-things.herokuapp.com/api/2211-FTB-ET-WEB-FT'

export const fetchPosts = async (token) => {
  try {
    let response = await fetch(`${APIURL}/posts`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error)
  }
}

export const newPost = async (token, title, description, price, location, willDeliver) => {
  try {
    let response = await fetch(`${APIURL}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price
        }
      })
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = async (token, postId) => {
  try {
    let response = await fetch(`${APIURL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

  } catch (error) {

  }
}

export const editPost = async (token, postId, title, description, price, location, willDeliver) => {
  try {
    let response = await fetch(`${APIURL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        }
      })
    })
  } catch (error) {

  }
}