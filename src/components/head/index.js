import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Controls from "../controls/index";
function Head({title, array,  modal, buttonName, totalPrice}) {
  return (
    <div className={'Head'+(title ==='Корзина' ? ' Head_bascket' : '')}>
      <h1>{title}</h1>
      {title ==='Корзина'? <Controls array={array} modal={modal} buttonName={buttonName} totalPrice={totalPrice}/> : null}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  array: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  buttonName: PropTypes.node,
  modal: PropTypes.func,
  count: PropTypes.number
};

export default React.memo(Head);
