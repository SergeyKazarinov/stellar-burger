import {FC} from 'react';

import s from './Loader.module.scss';

const Loader: FC = () => {
  return(
    <span className={s.loader}></span>
  );
};

export default Loader;