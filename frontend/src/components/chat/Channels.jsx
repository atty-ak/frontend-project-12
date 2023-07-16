import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { addModal } from '../../slices/modal';

const Channels = ({ curChannel, channelsList, setCurChannel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage.channels' });

  const chooseChannel = (id) => {
    dispatch(setCurChannel(id));
  };

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channelsList.map((channel) => {
        const btnClasses = classNames('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': channel.id === curChannel });
        const dropdownBtnClasses = classNames('d-flex', 'btn-group', { 'btn-secondary': channel.id === curChannel });
        if (channel.removable) {
          return (
            <li key={channel.id} className="nav-item w-100">
              <Dropdown className={dropdownBtnClasses}>
                <Button variant="" type="button" className={btnClasses} onClick={() => chooseChannel(channel.id)}>
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
                <Dropdown.Toggle variant={channel.id === curChannel ? 'btn-secondary' : ''}>
                  <span className="visually-hidden">Каналы</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" onClick={() => dispatch(addModal({ type: 'remove', channel }))}>{t('dropdown.delete')}</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={() => dispatch(addModal({ type: 'rename', channel }))}>{t('dropdown.rename')}</Dropdown.Item>
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
