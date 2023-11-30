import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {formattedCost} from '../../utils';

function Item(props) {
  const callbacks = {
    deleteItemFromCard: (e) => {
      e.stopPropagation();
      props.buttonAction(props.item);
    },

    addToCart: () => {
      props.buttonAction(props.item);
    }
}

return (
  <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
   >
    <div className='Item-code'>{props.item.code}</div>
    <div className='Item-title'>
      {props.item.title}
    </div>
    <div className="Item-price">{formattedCost(props.item.price)} &#8381;</div>
    {props.item.quantity? <div className="Item-quantity">{props.item.quantity} шт</div> : null}
    <div className='Item-actions'>
      <button onClick={props.button === 'Добавить'? callbacks.addToCart : callbacks.deleteItemFromCard} className="Item-action">
        {props.button}
      </button>
    </div>
  </div>
);
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  deleteItemFromCard: PropTypes.func,
  addToCart: PropTypes.func
};

Item.defaultProps = {
  deleteItemFromCard: () => {
  },
  addToCart: () => {
  },
}

export default React.memo(Item);
