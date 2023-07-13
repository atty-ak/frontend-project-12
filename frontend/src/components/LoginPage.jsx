import { useFormik } from 'formik';
import { object, string } from 'yup';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: object({
      login: string()
        .required(),
      password: string()
        .required(),
    }),
    onSubmit: () => {
      alert('бам');
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required
          placeholder="Ваш ник"
          id="username"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="password"
          required
          placeholder="Ваш ник"
          id="password"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="password">Ваш пароль</label>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
  );
};

export default LoginPage;
