import React from 'react';
import { Button } from 'reactstrap';

const Sub_previews = ({ modal, userID, chats, active, changeActiveConversation, openNewMessage, newRecipient, chatIDsOrderedByTime, getProperTimestamp }) => {
  return (
    <div style={{position: "relative"}}>
      <Button className={"new-message"} style={{backgroundColor: "#344e64"}} onClick={openNewMessage} disabled={newRecipient}>
        New Message
      </Button>
      <div className={newRecipient ? "messages-disabled" : ""}></div>
      <div className="messages">
        {chatIDsOrderedByTime.map(otherUserID => {
          let conversation = chats[String(otherUserID)];
          if (conversation) {
            var unreadMessageCount = conversation.filter(message => {
              return (!modal || Number(active) !== Number(message.sender.user_id)) && Number(message.receiver.user_id) === Number(userID) && Number(message.read) === 0;
            }).length;
          } else {
            var unreadMessageCount = 0;
          }
          return (
            <div className="message" key={otherUserID} name={otherUserID} onClick={changeActiveConversation}>
              <span className={Number(otherUserID) === Number(active) ? "active-bar" : null}></span>
              <i className="user-picture fas fa-user"></i>
              <span className="preview-timestamp">
              {
                conversation ?
                getProperTimestamp(conversation[conversation.length - 1].timestamp)
                : null
              }
              </span>

              <span className="preview-unread-messages" style={ unreadMessageCount ? {display: "inline-block"} : {display: "none"} }>
                {conversation && unreadMessageCount ? unreadMessageCount : null}
              </span>

              <div className="content">
                <span className="other-user-name">
                  {
                    conversation ?
                    conversation[0].sender.user_id === userID ? `${conversation[0].receiver.first_name} ${conversation[0].receiver.last_name}` : `${conversation[0].sender.first_name} ${conversation[0].sender.last_name}`
                    : null
                  }
                </span>
                <br/>
                <span className="last-message">
                  {
                    conversation ?
                    conversation[conversation.length - 1].sender.user_id === userID ? "You: " : `${conversation[conversation.length - 1].sender.first_name} ${conversation[conversation.length - 1].sender.last_name}: `
                    : null
                  }

                  {conversation ? conversation[conversation.length - 1].message : null}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Sub_previews;
