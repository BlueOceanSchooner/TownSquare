import React from 'react';
import { Button, Input } from 'reactstrap';

const Sub_conversation = ({ userID, activeName, chats, active, newMessage, updateNewMessage, sendNewMessage }) => {
  return (
    <div className="conversation">
      <div className="conversation-header">{activeName}</div>
      <div className="conversation-messages">
        {
          chats[active] ?
          chats[active].map(message => {
            return (
              <div key={message.dm_id} className={message.sender.user_id === userID ? "conversation-you" : "conversation-other"}>
                {message.sender.user_id === userID ? null : <i className="user-picture fas fa-user"></i>}

                <div className="conversation-content">
                  <span className="name">
                    {`${message.sender.first_name} ${message.sender.last_name}`}
                  </span>
                  <br/>
                  <span className="timestamp">
                    {new Date().toDateString().slice(4,15) === new Date(message.timestamp).toDateString().slice(4,15) ?
                    new Date(message.timestamp).getHours() > 12 ? `${new Date(message.timestamp).getHours() - 12}:${new Date(message.timestamp).getMinutes()} PM` : `${new Date(message.timestamp).getHours()}:${new Date(message.timestamp).getMinutes()} AM`
                    :
                    new Date(message.timestamp).toDateString().slice(4,10)}
                  </span>
                  <br />
                  <span className="message-content">
                    {message.message}
                  </span>
                </div>

                {message.sender.user_id !== userID ? null : <i className="user-picture fas fa-user"></i>}
              </div>
            )
          })
          : null
        }
      </div>
      <Input className={"input"} type="text" onChange={updateNewMessage} value={newMessage}/>
      <Button color="primary" disabled={newMessage === ''} onClick={sendNewMessage}>
        <i className="send-message fas fa-paper-plane"></i>
        Send
      </Button>
    </div>
  );
}

export default Sub_conversation;
