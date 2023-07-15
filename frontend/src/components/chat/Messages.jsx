import React from 'react';
import SendMessage from './SendMessage';
import useAuth from '../../hooks/useAuth';

const Messages = ({ curChannel, messagesList, channelsList }) => {
  const { loggedIn } = useAuth();

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {channelsList.find((channel) => channel.id === curChannel)?.name}
            </b>
          </p>
          <span className="text-muted">
            <span>Сообщений: </span>
            {messagesList
              .filter((message) => message.channelId === curChannel).length}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesList
            .filter((message) => message.channelId === curChannel)
            .map((message) => (
              <div key={message.id} className="text-break mb-2">
                <b>{message.userId}</b>
                :
                {message.value}
              </div>
            ))}
        </div>
        <SendMessage loggedIn={loggedIn} curChannel={curChannel} />
      </div>
    </div>
  );
};

export default Messages;
