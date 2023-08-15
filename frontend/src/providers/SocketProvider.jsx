import React from 'react';
import SocketContext from '../contexts/SocketContext';

const SocketProvider = ({ socket, children }) => {
  const chatApi = {
    addMessage: async (message) => {
      await socket.emit('newMessage', message);
    },
    addChannel: async (channel) => {
      const { data } = await socket.emitWithAck('newChannel', channel);
      return data.id;
    },
    removeChannel: async (id) => {
      await socket.emit('removeChannel', { id });
    },
    renameChannel: async ({ id, name }) => {
      await socket.emit('renameChannel', { id, name });
    },
  };

  return (
    <SocketContext.Provider value={chatApi}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
