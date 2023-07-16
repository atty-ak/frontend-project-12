import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import classNames from 'classnames';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';
import { channelsSelectors } from '../../slices/channels';

const Rename = ({ channel }) => {
  const dispatch = useDispatch();
  const chatApi = useSocket();
  const inputEl = useRef(null);
  const { t } = useTranslation('translation', { keyPrefix: 'modal.rename' });
  const channelsName = useSelector(channelsSelectors.selectAll).map(({ name }) => name);

  const handleSubmit = (name) => {
    chatApi.renameChannel({ id: channel.id, name });
    dispatch(addModal({ type: 'unactive' }));
  };

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: object({
      name: string()
        .min(3, t('errors.minMax'))
        .max(15, t('errors.minMax'))
        .required(t('errors.required'))
        .notOneOf(channelsName, t('errors.uniqName')),
    }),
    onSubmit: ({ name }) => handleSubmit(name),
  });
  console.log(channel.name);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <Modal show onHide={() => dispatch(addModal({ type: 'unactive' }))}>
      <Modal.Header>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal({ type: 'unactive' }))} />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control className={classNames({ 'is-invalid': formik.errors.name })} ref={inputEl} name="name" id="name" onChange={formik.handleChange} value={formik.values.name} />
          <label className="visually-hidden" htmlFor="name">{t('forLabel')}</label>
          {formik.errors.name && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.name}</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(addModal({ type: 'unactive' }))}>{t('cancel')}</Button>
        <Button variant="primary" type="submit" onClick={formik.handleSubmit}>{t('save')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;
