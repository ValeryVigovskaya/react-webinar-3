import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Controls from "../controls/index";
function Head({title, array, count, modal, buttonName}) {
  return (
    <div className={'Head'+(title ==='Корзина' ? ' Head_bascket' : '')}>
      <h1>{title}</h1>
      {title ==='Корзина'? <Controls array={array} count={count} modal={modal} buttonName={buttonName}/> : null}
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
