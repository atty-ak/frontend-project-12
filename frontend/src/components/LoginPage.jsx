import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import routes from '../routes';

const LoginPage = () => {
  const auth = useAuth();
  const [errorState, setErrorState] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'loginPage' });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: object({
      username: string()
        .required(),
      password: string()
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.login, values);
        const { token, username } = response.data;
        localStorage.setItem('userId', JSON.stringify({ token, username }));
        const userId = JSON.parse(localStorage.getItem('userId'));
        auth.logIn(userId.username);
        navigate(routes.chatPage);
      } catch (err) {
        setErrorState(true);
      }
    },
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="/pictures/chat_form.jpeg" className="rounded-circle" alt="Войти" />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('enter')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                    id="username"
                    className={classNames({ 'is-invalid': errorState })}
                    ref={inputRef}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  <Form.Label htmlFor="username">{t('username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    className={classNames({ 'is-invalid': errorState })}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  {errorState && <div className="invalid-tooltip" style={{ display: 'block' }}>{t('errors.wrongLoginOrPass')}</div>}
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('noAcc')}</span>
                <a href={routes.signupPage}>{t('registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
