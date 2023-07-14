import React from 'react';
import SocketContext from '../contexts/SocketContext';

const SocketProvider = ({ socket, children }) => {
  const chatApi = {
    addMessage: (message) => socket.emit('newMessage', message),
    addChannel: (channel) => socket.emit('newChannel', channel),
    removeChannel: (id) => socket.emit('removeChannel', { id }),
    renameChannel: ({ id, name }) => socket.emit('renameChannel', { id, name }),
  };

  return (
    <SocketContext.Provider value={chatApi}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
