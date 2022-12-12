import React from "react";

import Messages from "./Messages";

const Profile = ({ user, sentMessages, recievedMessages }) => {

  return (
    <div className="profile">
      <div className="left">
        <div className="photo"></div>
        {user.username}
      </div>
      <div className="right">
        <Messages sentMessages={sentMessages} recievedMessages={recievedMessages} />
      </div>
    </div>
  )
}

export default Profile;