import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { addModal } from '../../slices/modal';

const Channels = ({ curChannel, channelsList, setChannel }) => {
  const dispatch = useDispatch();

  const chooseChannel = (id) => {
    const newChannel = channelsList.find((channel) => channel.id === id);
    setChannel(newChannel);
  };

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channelsList.map((channel) => {
        const btnClasses = classNames('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': channel.id === curChannel.id });
        const dropdownBtnClasses = classNames('d-flex', 'btn-group', { 'btn-secondary': channel.id === curChannel.id });
        if (channel.removable) {
          return (
            <li key={channel.id} className="nav-item w-100">
              <Dropdown className={dropdownBtnClasses}>
                <Button variant="" type="button" className={btnClasses} onClick={() => chooseChannel(channel.id)}>
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
                <Dropdown.Toggle variant={channel.id === curChannel.id ? 'btn-secondary' : ''} />

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" onClick={() => dispatch(addModal({ type: 'remove', channel }))}>Удалить</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={() => dispatch(addModal({ type: 'rename', channel }))}>Переименовать</Dropdown.Item>
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
