import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addChannels, channelsSelectors } from '../../slices/channels';
import { fetchMessages, messagesSelectors } from '../../slices/messages';
import routes from '../../routes';
import useAuth from '../../hooks/useAuth';
import getModal from '../modal/modals';
import { addModal } from '../../slices/modal';
import Channels from './Channels';
import Messages from './Messages';

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getAuthHeader } = useAuth();
  const modalState = useSelector((state) => state.modal.value);
  const channelsList = useSelector(channelsSelectors.selectAll);
  const messagesList = useSelector(messagesSelectors.selectAll);

  const [curChannel, setChannel] = useState(channelsList.find((channel) => channel.id === 1));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.data, { headers: getAuthHeader() });
        const { channels, messages } = response.data;
        dispatch(addChannels(channels));
        if (messages.length !== 0) {
          dispatch(fetchMessages(messages));
        }
      } catch (e) {
        console.log(e);
        navigate(routes.loginPage);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button onClick={() => dispatch(addModal({ type: 'add' }))} type="button" aria-label="Add channel" className="p-0 text-primary btn btn-group-vertical">+</button>
          </div>
          <Channels curChannel={curChannel} channelsList={channelsList} setChannel={setChannel} />
        </div>
        <Messages curChannel={curChannel} messagesList={messagesList} />
        {getModal(modalState)}
      </div>
    </div>
  );
};

export default ChatPage;