import React from "react";
import photo from '../images/profile.png'
import Messages from "./Messages";

const Profile = ({ user, sentMessages, recievedMessages }) => {

  return (
    <div className="profile">
      <div className="left">
        <img className="photo" src={photo} />
        {user.username}
      </div>
      <div className="right">
        <Messages sentMessages={sentMessages} recievedMessages={recievedMessages} />
      </div>
    </div>
  )
}

export default Profile;