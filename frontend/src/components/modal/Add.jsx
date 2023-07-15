import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { object, string } from 'yup';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';
import { channelsSelectors } from '../../slices/channels';

const Add = () => {
  const dispatch = useDispatch();
  const chatApi = useSocket();
  const inputEl = useRef(null);
  const channelsName = useSelector(channelsSelectors.selectAll).map(({ name }) => name);

  const handleSubmit = (body) => {
    chatApi.addChannel({ name: body });
    dispatch(addModal({ type: 'unactive' }));
  };

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: object({
      body: string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле')
        .notOneOf(channelsName, 'Имя должно быть уникальным'),
    }),
    onSubmit: ({ body }) => handleSubmit(body),
  });

  useEffect(() => {
    inputEl.current.focus();
  });

  return (
    <Modal show onHide={() => dispatch(addModal({ type: 'unactive' }))}>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal({ type: 'unactive' }))} />
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <FormGroup>
            <FormControl ref={inputEl} id="body" onChange={formik.handleChange} value={formik.values.body} />
            <label className="visually-hidden" htmlFor="name">Имя канала</label>
            {formik.touched.body && formik.errors.body && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.body}</div>}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" type="submit">Отправить</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Add;
