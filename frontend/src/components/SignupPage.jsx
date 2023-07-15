import React, { useState } from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';
import useAuth from '../hooks/useAuth';

const SignupPage = () => {
  const [regState, setRegState] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: object({
      username: string()
        .min(3, '3 min')
        .max(20, '20max')
        .required('Required'),
      password: string()
        .min(6, '6min')
        .max(20, '20max')
        .required('Required'),
      confirmPassword: string()
        .test('confirmPassword', 'Пароли должны совпадать', (value, context) => value === context.parent.password),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.signupData, {
          username: values.username, password: values.password,
        });
        const { token, username } = response.data;
        console.log(response);
        localStorage.setItem('userId', JSON.stringify({ token, username }));
        auth.logIn(username);
        navigate(routes.chatPage);
      } catch (e) {
        console.log(e);
        setRegState(true);
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div><img src="/pictures/signup_page.jpg" alt="" /></div>
              <form className="w-50" onSubmit={formik.handleSubmit}>
                <h1>Регистрация</h1>
                <div className="form-floating mb-3">
                  <input placeholder="От 3 до 20 символов" name="username" autoComplete="username" required="" id="username" className={classNames('form-control', { 'is-invalid': formik.errors.username })} onChange={formik.handleChange} value={formik.values.username} />
                  <label className="form-label" htmlFor="username">Имя пользователя</label>
                  {formik.errors.username && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.username}</div>}
                </div>
                <div className="form-floating mb-3">
                  <input placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password" id="password" className={classNames('form-control', { 'is-invalid': formik.errors.password })} aria-autocomplete="list" onChange={formik.handleChange} value={formik.values.password} />
                  <label className="form-label" htmlFor="password">Пароль</label>
                  {formik.errors.password && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.password}</div>}
                </div>
                <div className="form-floating mb-4">
                  <input placeholder="Пароли должны совпадать" name="confirmPassword" required="" autoComplete="new-password" type="password" id="confirmPassword" className={classNames('form-control', { 'is-invalid': formik.errors.confirmPassword })} onChange={formik.handleChange} value={formik.values.confirmPassword} />
                  <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
                  {formik.errors.confirmPassword && <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.confirmPassword}</div>}
                  {regState && <div className="invalid-tooltip" style={{ display: 'block' }}>Пользователь уже существует</div>}
                </div>
                <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
