import React from "react";
import './style.css';
import PropTypes from "prop-types";

function EmptyPage({description}) {
  return (
    <div className="EmptyPage">{description}</div>
  )
}

EmptyPage.propTypes = {
  description: PropTypes.node,
};

export default React.memo(EmptyPage);