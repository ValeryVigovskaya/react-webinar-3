import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import './style.css';
import {formattedCost} from '../../utils';

function TotalPrice({ array, count, buttonName }) {

  const totalPrice = useMemo(() => {
   return array.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
  }, [array]);

  return (
    <div className="Price">
      {buttonName === 'Перейти' ? <div className="Price-container"> <div>В корзине:</div>
        <div className="Price-item">{count > 0 ? `${count} ${plural(count, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} / ${formattedCost(totalPrice)} ₽` : 'пусто'}</div> </div> : null}
      {buttonName === 'Удалить' ? <div className="Price-bascet"><div className="Price-item">Итого</div>
        <div className="Price-item">{formattedCost(totalPrice)} &#8381;</div> </div> : null}
    </div>

  )
}

const itemTypes = PropTypes.shape({
  price: PropTypes.number.isRequired,
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired
})

const totalPriceTypes = PropTypes.shape({
  array: PropTypes.arrayOf(itemTypes.isRequired).isRequired,
});

TotalPrice.propTypes = {
  totalPrice: totalPriceTypes,
  count: PropTypes.number,
  buttonName: PropTypes.string
};

export default React.memo(TotalPrice);