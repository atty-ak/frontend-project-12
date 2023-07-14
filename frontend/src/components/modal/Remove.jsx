import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';

const Remove = ({ channelId }) => {
  const dispatch = useDispatch();
  const chatApi = useSocket();

  const handleRemove = (id) => {
    chatApi.removeChannel(id);
    dispatch(addModal({ type: 'unactive' }));
  };

  return (
    <Modal show onHide={() => dispatch(addModal({ type: 'unactive' }))}>
      <Modal.Header>
        <Modal.Title>Удалить канал</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal({ type: 'unactive' }))} />
      </Modal.Header>
      <Modal.Body>
        Уверены?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(addModal({ type: 'unactive' }))}>Отмена</Button>
        <Button variant="danger" onClick={() => handleRemove(channelId)}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
