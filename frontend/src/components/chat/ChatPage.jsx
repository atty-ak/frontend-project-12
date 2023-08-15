import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import {
  addChannels, setCurrentChannel, channelsSelectors, getCurrentChannel,
} from '../../slices/channels';
import { fetchMessages, messagesSelectors } from '../../slices/messages';
import routes from '../../routes';
import useAuth from '../../hooks/useAuth';
import getModal from '../modal/modals';
import { addModal, getModalState } from '../../slices/modal';
import Channels from './Channels';
import Messages from './Messages';

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAuthHeader, userCurrent } = useAuth();
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage.main' });

  const modalState = useSelector(getModalState);
  const channelsList = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector(getCurrentChannel);
  const messagesList = useSelector(messagesSelectors.selectAll);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.dataPath(), {
          headers: getAuthHeader(userCurrent),
        });
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('channels')}</b>
            <button onClick={() => dispatch(addModal({ type: 'add' }))} type="button" aria-label="Add channel" className="p-0 text-primary btn btn-group-vertical">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">{t('plusSymbol')}</span>
            </button>
          </div>
          <Channels
            currentChannel={currentChannel}
            channelsList={channelsList}
            setCurrentChannel={setCurrentChannel}
          />
        </div>
        <Messages
          currentChannel={currentChannel}
          messagesList={messagesList}
          channelsList={channelsList}
        />
        {getModal(modalState)}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChatPage;
