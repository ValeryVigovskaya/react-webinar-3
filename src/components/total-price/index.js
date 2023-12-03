import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import './style.css';
import {formattedCost} from '../../utils';

function TotalPrice({ array, buttonName, totalPrice }) {
  return (
    <div className="Price">
      {buttonName === 'Перейти' ? <div className="Price-container"> <div>В корзине:</div>
        <div className="Price-item">{array?.length > 0 ? `${array.length} ${plural(array.length, {
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
  })
})

TotalPrice.propTypes = {
  totalPrice: PropTypes.number,
  count: PropTypes.number,
  buttonName: PropTypes.string,
  array: PropTypes.arrayOf(itemTypes),
};

export default React.memo(TotalPrice);