import React, {FC, ReactNode} from 'react';

import s from './IngredientContainer.module.scss';

interface IIngredientContainerProps {
  title: string;
  href: string;
  children: ReactNode;
}

const IngredientContainer: FC<IIngredientContainerProps> = ({title, href, children}) => {

  return (
    <>
      <h3 className={'text text_type_main-medium'} id={href}>{title}</h3>
      <ul className={`list mt-6 ml-4 mb-10 ${s.ingredientContainer__flexContainer}`}>
        {children}
      </ul>
    </>
  );
};

export default IngredientContainer;