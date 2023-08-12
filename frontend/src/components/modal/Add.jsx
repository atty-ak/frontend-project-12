import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import { addModal } from '../../slices/modal';
import useSocket from '../../hooks/useSocket';
import { channelsSelectors } from '../../slices/channels';

const Add = () => {
  const dispatch = useDispatch();
  const chatApi = useSocket();
  const inputEl = useRef(null);
  const { t } = useTranslation();
  const channelsList = useSelector(channelsSelectors.selectAll);

  const handleSubmit = (name) => {
    chatApi.addChannel({ name });
    setTimeout(() => toast.success(t('notifies.channelAdd')));
    dispatch(addModal({ type: 'unactive' }));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: object({
      name: string()
        .min(3, t('modal.add.errors.minMax'))
        .max(20, t('modal.add.errors.minMax'))
        .required(t('modal.add.errors.required'))
        .notOneOf(channelsList.map(({ name }) => name), t('modal.add.errors.uniqName')),
    }),
    onSubmit: ({ name }) => handleSubmit(name),
  });

  useEffect(() => {
    inputEl.current.focus();
  });

  return (
    <>
      <Modal show onHide={() => dispatch(addModal({ type: 'unactive' }))}>
        <Modal.Header>
          <Modal.Title>{t('modal.add.addChannel')}</Modal.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(addModal({ type: 'unactive' }))} />
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <FormGroup>
              <FormControl ref={inputEl} id="name" onChange={formik.handleChange} value={formik.values.name} />
              <label className="visually-hidden" htmlFor="name">{t('modal.add.forLabel')}</label>
              {formik.touched.name && formik.errors.name && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.name}</div>}
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" type="submit">{t('modal.add.send')}</button>
          </Modal.Footer>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Add;
