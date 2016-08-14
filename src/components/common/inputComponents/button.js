import React, {PropTypes} from "react";

const ButtonComponent = ({name, text, action, newClass}) => {
  return (
    <button
      className={`btn waves-effect waves-light ${newClass}`}
      type='submit' onClick={action}
      name={name}>
      {text}
    </button>
  );
};

ButtonComponent.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
  newClass: PropTypes.string
};

export default ButtonComponent;