import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import TotalPrice from "../total-price/index";
function List({ list, addToCart, button, buttonAction, count }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} addToCart={addToCart} button={button} buttonAction={buttonAction} />
        </div>
      )}
       <TotalPrice array={list} count={count} buttonName={button} />
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  addToCart: PropTypes.func,
  buttonAction: PropTypes.func,
  button: PropTypes.string,
  count: PropTypes.number
};

export default React.memo(List);
