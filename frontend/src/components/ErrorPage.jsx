import { useTranslation } from 'react-i18next';
import routes from '../routes';
import errorImg from '../pictures/error_page.svg';

const ErrorPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'errorPage' });
  return (
    <div className="text-center" id="error-page" style={{ padding: '20px' }}>
      <img src={errorImg} className="img-fluid h-25" alt="" width="50%" height="50%" />
      <h1>{t('notFound')}</h1>
      <p className="text-muted">
        {t('variantToDo')}
        <a href={routes.chatPage}>
          {' '}
          {t('mainPage')}
        </a>
      </p>
    </div>
  );
};

export default ErrorPage;
