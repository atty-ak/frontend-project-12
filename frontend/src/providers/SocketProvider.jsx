import React from 'react';
import SocketContext from '../contexts/SocketContext';

const SocketProvider = ({ socket, children }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);

export default SocketProvider;
