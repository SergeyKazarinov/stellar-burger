import {FC} from 'react';

import OrderDetails from '../../components/OrderDetails/OrderDetails';
import OrderIngredientItem from '../../components/OrderIngredientItem/OrderIngredientItem';
import TotalPrice from '../../components/TotalPrice/TotalPrice';

import { useAppSelector } from '../../hooks/useTypedSelector';

import s from './OrderDetailsPage.module.scss';

interface IOrderDetailsPageProps {

}

const OrderDetailsPage: FC<IOrderDetailsPageProps> = () => {
  const order = useAppSelector(store => store.modal.order);

  return (
    <section className={s.OrderDetailsPage}>
      <OrderDetails order={order}/>
      {/* <h2 className={`text text_type_digits-default ${s.orderNumber}`}>#034533</h2>
      <h3 className={`mt-10 text text_type_main-medium ${s.orderName}`}>
        Black Hole Singularity острый бургер
      </h3>
      <p className={`text text_type_main-default mt-2 ${s.status}`}>Выполнен</p>
      <h4 className={`mt-15 mb-6 text text_type_main-medium ${s.composition}`}>Состав:</h4>
      <ul className={`list pr-6 ${s.compositionContainer}`}>
        <li><OrderIngredientItem /></li>
        <li><OrderIngredientItem /></li>
        <li><OrderIngredientItem /></li>
        <li><OrderIngredientItem /></li>
        <li><OrderIngredientItem /></li>
        <li><OrderIngredientItem /></li>
        <li><OrderIngredientItem /></li>
      </ul>
      <div className={`mt-10 ${s.totalPrice}`}>
        <p className={'text text_type_main-default text_color_inactive'}>Вчера, 13:50 i-GMT+3</p>
        <TotalPrice totalPrice={510} />
      </div> */}
    </section>
  );
};

export default OrderDetailsPage;