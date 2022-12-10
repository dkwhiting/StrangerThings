import React, { useState } from 'react';
import { postMessage, deletePost } from '../../api/posts';




const SinglePost = ({ token, posts, post, setCurrentPost, setUpdater, updater, index, favorite, setFavorite }) => {
  const [newMessage, setNewMessage] = useState('')
  const [currentMessages, setCurrentMessages] = useState(null)
  const [showNewMessage, setShowNewMessage] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  // 


  const todaysDate = new Date()
  const createdAt = new Date(post.createdAt)

  const dateDifference = (now, createdAt) => {
    const difference = (now - createdAt) / 1000 / 60 / 60;
    return (
      difference < 1 ? `${Math.floor(difference * 60)} minutes ago`
        : difference < 2 ? `${Math.floor(difference)} hour ago`
          : difference < 24 ? `${Math.floor(difference)} hours ago`
            : difference < 48 ? `${Math.floor(difference / 24)} day ago`
              : `${Math.floor(difference / 24)} days ago`
    )
  }

  const deleteHandler = (event) => {
    event.preventDefault();
    const postId = event.target.className.split(' ')[2]
    deletePost(token, postId)
    setUpdater(!updater)
  }

  const newMessageHandler = async (event, postId) => {
    event.preventDefault();
    if (newMessage != '') {
      await postMessage(token, postId, newMessage);
      setUpdater(!updater);
      setNewMessage('')
    } else {
      console.log('Can not send blank message')
    }
  }

  const reverseOrder = () => {
    return posts.length - index
  }

  const favoriteHandler = () => {
    // debugger
    if (localStorage.getItem('favorites') && favorite && Object.keys(favorite).length > 0) {
      setFavorite((JSON.parse(localStorage.getItem('favorites'))).favorites)
      const copy = [...favorite]
      if (copy.includes(post._id)) {
        for (let i in copy) {
          if (copy[i] === post._id) {
            copy.splice(i, 1)
            setFavorite(copy)
            localStorage.setItem('favorites', JSON.stringify({ favorites: favorite }))
          }
        }
      } else {
        copy.push(post._id)
        setFavorite(copy)
        localStorage.setItem('favorites', JSON.stringify({ favorites: favorite }))
      }
      setUpdater(!updater)
    } else {
      const obj = { favorites: [post._id] }
      localStorage.setItem('favorites', JSON.stringify(obj))
      setFavorite((JSON.parse(localStorage.getItem('favorites'))).favorites)
    }
  }



  return (
    <div className="single-post" key={post._id} style={{ order: posts.length - index }}>
      <div className="post-header" >
        <div className='post-header-left'>
          <div className="post-user">{post.author.username}</div>
          <div className="post-time">{dateDifference(todaysDate, createdAt)}</div>
        </div>
        {post.isAuthor
          ? <div className="header-buttons">
            <i className={`fa-solid fa-pen-to-square ${post._id}`} onClick={() => { setCurrentPost(post) }}></i>
            <i className={`fa-solid fa-trash-can ${post._id}`} onClick={deleteHandler}></i>
          </div>
          : <div className="header-buttons">
            {
              favorite && favorite.includes(post._id)
                ? <i className="active fa-solid fa-star" onClick={favoriteHandler}></i>
                : <i className="inactive fa-regular fa-star" onClick={favoriteHandler}></i>
            }

          </div>}
      </div>
      <div className="post-body">
        <div className="post-price">{post.price}</div>
        <div className="post-title">{post.title}</div>
        <div className="post-description">{post.description}</div>
        <div className="post-location">{post.location}</div>
        <div className="will-deliver">{post.willDeliver}</div>
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
            }}>Send Message</a>
          </div>

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
    </div>
  )
}

export default SinglePost