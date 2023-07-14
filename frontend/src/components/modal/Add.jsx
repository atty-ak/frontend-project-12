import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';

const Add = () => {
  const dispatch = useDispatch();
  const chatApi = useSocket();

  const handleSubmit = (body) => {
    chatApi.addChannel({ name: body });
    dispatch(addModal('unactive'));
  };

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }) => handleSubmit(body),
  });

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  });

  return (
    <Modal show onHide={() => dispatch(addModal('unactive'))}>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal('unactive'))} />
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl ref={inputEl} id="body" onChange={formik.handleChange} value={formik.values.body} />
            <input className="btn btn-primary" type="submit" value="submit" />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
