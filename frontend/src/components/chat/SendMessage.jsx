import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import useSocket from '../../hooks/useSocket';

const SendMessage = ({ loggedIn, currentChannel }) => {
  const [message, setMessage] = useState('');
  const inputEl = useRef(null);
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage.messages.sendMessagesForm' });
  const chatApi = useSocket();

  useEffect(() => {
    inputEl.current.focus();
  });

  const handleSending = (e) => {
    e.preventDefault();
    if (message.length !== 0) {
      const formedMessage = {
        channelId: currentChannel,
        userId: loggedIn,
        id: _.uniqueId(),
        value: message,
      };
      chatApi.addMessage(formedMessage);
      setMessage('');
    }
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate className="py-1 border rounded-2" onSubmit={handleSending}>
        <div className="input-group has-validation">
          <input ref={inputEl} value={message} name="body" aria-label={t('newMessagePlaceholder')} placeholder={t('placeholder')} className="border-0 p-0 ps-2 form-control" onChange={(e) => setMessage(e.target.value)} />
          <button type="submit" disabled="" className="btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('send')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
