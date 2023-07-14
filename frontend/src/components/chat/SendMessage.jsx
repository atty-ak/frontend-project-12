import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import useSocket from '../../hooks/useSocket';

const SendMessage = ({ loggedIn, channelId }) => {
  const [message, setMessage] = useState('');
  const inputEl = useRef(null);

  const chatApi = useSocket();

  useEffect(() => {
    inputEl.current.focus();
  });

  const handleSending = (e) => {
    e.preventDefault();
    if (message.length !== 0) {
      const formedMessage = {
        channelId,
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
          <input ref={inputEl} value={message} name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" onChange={(e) => setMessage(e.target.value)} />
          <button type="submit" disabled="" className="btn btn-group-vertical">
            <img src="/pictures/send_message_button.svg" style={{ width: '15px', height: '15px' }} alt="" />
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
