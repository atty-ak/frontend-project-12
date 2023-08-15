import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { addModal } from '../../slices/modal';

const Channels = ({ currentChannel, channelsList, setCurrentChannel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage.channels' });

  const chooseChannel = (id) => {
    dispatch(setCurrentChannel(id));
  };

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channelsList.map((channel) => {
        const btnClasses = classNames('w-100', 'rounded-0', 'text-start', 'text-truncate', { 'btn-secondary': channel.id === currentChannel });
        const dropdownBtnClasses = classNames('d-flex', 'btn-group', { 'btn-secondary': channel.id === currentChannel });
        if (channel.removable) {
          return (
            <li key={channel.id} className="nav-item w-100">
              <Dropdown className={dropdownBtnClasses}>
                <Button variant="" type="button" className={btnClasses} onClick={() => chooseChannel(channel.id)}>
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
                <Dropdown.Toggle variant={channel.id === currentChannel ? 'btn-secondary' : ''}>
                  <span className="visually-hidden">{t('channelСontrol')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => dispatch(addModal({ type: 'remove', channel }))}>{t('dropdown.delete')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => dispatch(addModal({ type: 'rename', channel }))}>{t('dropdown.rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          );
        }
        return (
          <li key={channel.id} className="nav-item w-100">
            <div className="d-flex dropdown btn-group">
              <Button variant="" type="button" className={btnClasses} onClick={() => chooseChannel(channel.id)}>
                <span className="me-1">#</span>
                {channel.name}
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Channels;
