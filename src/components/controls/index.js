import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import TotalPrice from "../total-price/index";


function Controls({ array, count, modal, buttonName }) {
  return (
    <div className='Controls'>
      <TotalPrice array={array} count={count} buttonName={buttonName} />
       <button className='Controls-button' onClick={() => modal()}>{buttonName}</button>
    </div>
  )
}

Controls.propTypes = {
  array: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  buttonName: PropTypes.node,
  modal: PropTypes.func,
  count: PropTypes.number
};

Controls.defaultProps = {
  modal: () => { }
}

export default React.memo(Controls);
