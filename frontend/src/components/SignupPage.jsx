import React from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import classNames from 'classnames';

const SignupPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
        .min(6, '6min')
        .max(20, '20max')
        .required('Required'),
    }),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div><img src="/gg" alt="пока что нет" /></div>
              <form className="w-50" onSubmit={handleSubmit}>
                <h1>Регистрация</h1>
                <div className="form-floating mb-3">
                  <input placeholder="От 3 до 20 символов" name="username" autoComplete="username" required="" id="username" className={classNames('form-control', { 'is-invalid': formik.touched.username && formik.errors.username })} onChange={formik.handleChange} value={formik.values.username} />
                  <label className="form-label" htmlFor="username">Имя пользователя</label>
                  {formik.touched.username && formik.errors.username && <div className="invalid-tooltip">{formik.errors.username}</div>}
                </div>
                <div className="form-floating mb-3">
                  <input placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password" id="password" className={classNames('form-control', { 'is-invalid': formik.touched.password && formik.errors.password })} aria-autocomplete="list" onChange={formik.handleChange} value={formik.values.password} />
                  <label className="form-label" htmlFor="password">Пароль</label>
                  {formik.touched.password && formik.errors.password && <div className="invalid-tooltip">{formik.errors.password}</div>}
                </div>
                <div className="form-floating mb-4">
                  <input placeholder="Пароли должны совпадать" name="confirmPassword" required="" autoComplete="new-password" type="password" id="confirmPassword" className={classNames('form-control', { 'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword })} onChange={formik.handleChange} value={formik.values.confirmPassword} />
                  <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="invalid-tooltip">{formik.errors.confirmPassword}</div>}
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
