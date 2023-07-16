import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import classNames from 'classnames';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';
import { channelsSelectors } from '../../slices/channels';

const Rename = ({ channel }) => {
  const dispatch = useDispatch();
  const chatApi = useSocket();
  const inputEl = useRef(null);
  const { t } = useTranslation();
  const channelsName = useSelector(channelsSelectors.selectAll).map(({ name }) => name);

  const handleSubmit = (name) => {
    chatApi.renameChannel({ id: channel.id, name });
    setTimeout(() => toast.success(t('notifies.channelRename')));
    dispatch(addModal({ type: 'unactive' }));
  };

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: object({
      name: string()
        .min(3, t('modal.rename.errors.minMax'))
        .max(15, t('modal.rename.errors.minMax'))
        .required(t('modal.rename.errors.required'))
        .notOneOf(channelsName, t('modal.rename.errors.uniqName')),
    }),
    onSubmit: ({ name }) => handleSubmit(name),
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <Modal show onHide={() => dispatch(addModal({ type: 'unactive' }))}>
      <Modal.Header>
        <Modal.Title>{t('modal.rename.renameChannel')}</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal({ type: 'unactive' }))} />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control className={classNames({ 'is-invalid': formik.errors.name })} ref={inputEl} name="name" id="name" onChange={formik.handleChange} value={formik.values.name} />
          <label className="visually-hidden" htmlFor="name">{t('modal.rename.forLabel')}</label>
          {formik.errors.name && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.name}</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(addModal({ type: 'unactive' }))}>{t('modal.rename.cancel')}</Button>
        <Button variant="primary" type="submit" onClick={formik.handleSubmit}>{t('modal.rename.save')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;
