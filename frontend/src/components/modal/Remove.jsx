import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';

const Remove = ({ channelId }) => {
  const dispatch = useDispatch();
  const chatApi = useSocket();
  const { t } = useTranslation();

  const handleSubmit = (id) => {
    chatApi.removeChannel(id);
    setTimeout(() => toast.success(t('notifies.channelRemove')));
    dispatch(addModal({ type: 'unactive' }));
  };

  return (
    <Modal show onHide={() => dispatch(addModal({ type: 'unactive' }))}>
      <Modal.Header>
        <Modal.Title>{t('modal.remove.deleteChannel')}</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal({ type: 'unactive' }))} />
      </Modal.Header>
      <Modal.Body>
        {t('modal.remove.sure')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(addModal({ type: 'unactive' }))}>{t('modal.remove.cancel')}</Button>
        <Button variant="danger" type="submit" onClick={() => handleSubmit(channelId)}>{t('modal.remove.delete')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
