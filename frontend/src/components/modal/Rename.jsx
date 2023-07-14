import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { FormControl, Modal, Button } from 'react-bootstrap';
import { object, string } from 'yup';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';

const Rename = ({ channel }) => {
  const dispatch = useDispatch();
  const chatApi = useSocket();
  const inputEl = useRef(null);

  const handleSubmit = (body) => {
    chatApi.renameChannel({ id: channel.id, name: body });
    dispatch(addModal({ type: 'unactive' }));
  };

  const formik = useFormik({
    initialValues: {
      body: channel.name,
    },
    validationSchema: object({
      body: string()
        .min(1, 'Must be at least 1 character')
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    }),
    onSubmit: ({ body }) => handleSubmit(body),
  });

  useEffect(() => {
    inputEl.current.focus();
  });

  return (
    <Modal show onHide={() => dispatch(addModal({ type: 'unactive' }))}>
      <Modal.Header>
        <Modal.Title>Переименовать канал</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal({ type: 'unactive' }))} />
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormControl ref={inputEl} id="body" onChange={formik.handleChange} value={formik.values.body} />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(addModal({ type: 'unactive' }))}>Отмена</Button>
        <Button variant="primary" type="submit" onClick={() => handleSubmit(formik.values.body)}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;
