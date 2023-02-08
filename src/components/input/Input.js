import React from "react";

import "./Input.scss";

const Input = (props) => {
  const clickHandler = (e) => {
    e.target.value = "";
  };
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onClick={clickHandler}
      onChange={props.onChange ? (e) => props.onChange(e) : null}
    />
  );
};

export default Input;
