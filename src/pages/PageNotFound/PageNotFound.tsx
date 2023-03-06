import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {FC} from 'react';

import { useHistory } from 'react-router-dom';

import s from './PageNotFound.module.scss';

const PageNotFound: FC = () => {
  const history = useHistory();

  const handleMovePageOnMain = () => {
    history.replace('/');
  };

  return (
    <section className={s.pageNotFound}>
      <h1 className={`text text_type_digits-large ${s.title}`}>404</h1>
      <p className={`mt-5 text text_type_main-large ${s.subtitle}`}>
        Страница не найдена
      </p>
      <Button
        htmlType='button'
        type="secondary"
        size="large"
        onClick={handleMovePageOnMain}
      >
        На главную
      </Button>
    </section>
  );
};

export default PageNotFound;