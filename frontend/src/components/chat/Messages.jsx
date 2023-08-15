import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import SendMessage from './SendMessage';
import useAuth from '../../hooks/useAuth';

const Messages = ({ currentChannel, messagesList, channelsList }) => {
  const { loggedIn } = useAuth();
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage.messages' });
  const messagesRef = useRef(null);

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('fr'));
  filter.add(filter.getDictionary('ru'));

  useEffect(() => {
    messagesRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesList]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {t('hashSymbol')}
              {' '}
              { channelsList.find((channel) => channel.id === currentChannel)?.name}
            </b>
          </p>
          <span className="text-muted">
            {t('messagesCount')}
            {' '}
            {messagesList.filter((message) => message.channelId === currentChannel).length}
          </span>
        </div>
        <div ref={messagesRef} id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesList
            .filter((message) => message.channelId === currentChannel)
            .map((message) => (
              <div key={message.id} className="text-break mb-2">
                <b>{message.userId}</b>
                :
                {filter.clean(message.value)}
              </div>
            ))}
        </div>
        <SendMessage loggedIn={loggedIn} currentChannel={currentChannel} />
      </div>
    </div>
  );
};

export default Messages;
