import './style.css';
import PropTypes from 'prop-types';
import React from "react";

function ModalOverlay({ onClose }) {
  return (
    <div className='overlay' onClick={onClose}></div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default React.memo(ModalOverlay);