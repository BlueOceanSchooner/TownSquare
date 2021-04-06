import React from 'react';

const Sub_previews = ({ userID, chats, active, changeActiveConversation }) => {
  return (
    <div className="messages">
      {Object.keys(chats).map(otherUserID => {
        let conversation = chats[otherUserID];
        return (
          <div className="message" key={otherUserID} name={otherUserID} onClick={changeActiveConversation}>
            <span className={otherUserID === active ? "active-bar" : null}></span>
            <i className="user-picture fas fa-user"></i>
            <div className="content">
              <span className="other-user-name">
                {conversation[0].sender.user_id === userID ? `${conversation[0].receiver.first_name} ${conversation[0].receiver.last_name}` : `${conversation[0].sender.first_name} ${conversation[0].sender.last_name}`}
              </span>
              <br/>
              <span className="last-message">
                {conversation[conversation.length - 1].sender.user_id === userID ? "You: " : `${conversation[conversation.length - 1].sender.first_name} ${conversation[conversation.length - 1].sender.last_name}: `}
                {conversation[conversation.length - 1].message}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Sub_previews;
