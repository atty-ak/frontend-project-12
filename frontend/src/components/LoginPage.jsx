import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import classNames from 'classnames';
import useAuth from '../hooks/useAuth';
import routes from '../routes';

const LoginPage = () => {
  const auth = useAuth();
  const [errorState, setErrorState] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
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
        const res = await axios.post(routes.login, values);
        const { token, username } = res.data;
        localStorage.setItem('userId', JSON.stringify({ token, username }));
        auth.logIn(username);
        navigate(routes.chatPage);
      } catch (err) {
        setErrorState(true);
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">Hexlet Chat</a>
          </div>
        </nav>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="/pictures/chat_form.svg" className="rounded-circle" alt="Войти" />
                  </div>
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">Войти</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        name="username"
                        autoComplete="username"
                        required
                        placeholder="Ваш ник"
                        id="username"
                        className={classNames('form-control', { 'is-invalid': errorState })}
                        ref={inputRef}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                      />
                      <Form.Label htmlFor="username">Ваш ник</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder="Пароль"
                        type="password"
                        id="password"
                        className={classNames('form-control', { 'is-invalid': errorState })}
                        ref={inputRef}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <Form.Label htmlFor="password">Ваш пароль</Form.Label>
                      {errorState && <div className="invalid-tooltip" style={{ display: 'block' }}>Неверные имя пользователя или пароль</div>}
                    </Form.Group>
                    <Button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</Button>
                  </Form>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>Нет аккаунта?</span>
                    <a href={routes.signupPage}>Регистрация</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
