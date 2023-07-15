import routes from '../routes';

const ErrorPage = () => (
  <div className="text-center" id="error-page" style={{ padding: '20px' }}>
    <img src="/pictures/error_page.svg" className="img-fluid h-25" alt="" width="50%" height="50%" />
    <h1>Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      <a href={routes.chatPage}>на главную страницу</a>
    </p>
  </div>
);

export default ErrorPage;
