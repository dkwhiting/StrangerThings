import React, { useState } from 'react';
import { postMessage, deletePost } from '../../api/posts';



const SinglePost = ({ token, posts, post, setCurrentPost, setAllPosts }) => {
  const [newMessage, setNewMessage] = useState('')
  const [currentMessages, setCurrentMessages] = useState(null)
  const [showNewMessage, setShowNewMessage] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [favorite, setFavorite] = useState(localStorage.getItem(`${post._id}`))

  const todaysDate = new Date()
  const createdAt = new Date(post.createdAt)

  const dateDifference = (now, createdAt) => {
    const difference = (now - createdAt) / 1000 / 60 / 60;
    return (
      difference < 1 ? `${Math.floor(difference * 60)} minutes ago`
        : difference < 2 ? `${Math.floor(difference)} hour ago`
          : difference < 24 ? `${Math.floor(difference)} hours ago`
            : difference < 48 ? `${Math.floor(difference / 24)} day ago`
              : 'days ago'
    )
  }

  const deleteHandler = (event) => {
    event.preventDefault();
    const postId = event.target.className.split(' ')[2]
    deletePost(token, postId)
    setAllPosts([...posts])
  }

  const newMessageHandler = async (event, postId) => {
    event.preventDefault();
    if (newMessage != '') {
      await postMessage(token, postId, newMessage);
      setAllPosts([...posts]);
      setNewMessage('')
    } else {
      console.log('Can not send blank message')
    }
  }

  const favoriteHandler = () => {
    localStorage.getItem(`${post._id}`)
      ? localStorage.removeItem(`${post._id}`)
      : localStorage.setItem(`${post._id}`, 'favorite')

    console.log(localStorage)

  }

  return (
    <div className="single-post" key={post._id}>
      <div className="post-header">
        <div className="post-user">{post.author.username}</div>
        {post.isAuthor
          ? <div className="header-buttons">
            <i className={`fa-solid fa-pen-to-square ${post._id}`} onClick={() => { setCurrentPost(post) }}></i>
            <i className={`fa-solid fa-trash-can ${post._id}`} onClick={deleteHandler}></i>
          </div>
          : <div className="header-buttons">
            {
              favorite
                ? <i class="fa-solid fa-star" onClick={() => { favoriteHandler(); setFavorite(!favorite) }}></i>
                : <i class="fa-regular fa-star" onClick={() => { favoriteHandler(); setFavorite(!favorite) }}></i>
            }
          </div>}
      </div>
      <div className="post-time">{dateDifference(todaysDate, createdAt)}</div>
      <div className="post-price">{post.price}</div>
      <div className="post-title">{post.title}</div>
      <div className="post-description">{post.description}</div>
      {post.isAuthor
        ? <div className="show-messages">
          <a onClick={() => {
            setShowMessages(!showMessages);
            setCurrentMessages(currentMessages == post._id ? null : post._id);
            setNewMessage('')
          }
          }>{post.messages.length} messages</a></div>
        : <div className="send-message">
          <a onClick={() => {
            setShowNewMessage(!showNewMessage);
            setCurrentMessages(currentMessages == post._id ? null : post._id);
            setNewMessage('')
          }}>Send Message</a></div>

      }
      {showMessages && post.isAuthor
        ? <div className="all-messages">
          {post.messages.map((message) => {
            return (
              <div key={`${post._id}-${message._id}`} className="messages-view">
                <div className="all-messages">
                  {message.fromUser.username}
                  {message.content}
                </div>
              </div>
            )
          })}
        </div> : <></>
      }
      {showNewMessage && !post.isAuthor
        ? < form className="new-message" onSubmit={(event) => newMessageHandler(event, post._id)}>
          <input type="text" value={newMessage} onChange={(event) => setNewMessage(event.target.value)} />
          <button type="submit">Send</button>
        </form>
        : <></>
      }
    </div>
  )
}

export default SinglePost