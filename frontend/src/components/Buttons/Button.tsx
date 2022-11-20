import React from "react";

const Button = ({ text, onPress, color }) => {
  return (
    <button color={color} onPress={onPress}>
      {text}
    </button>
  );
};

export default Button;
