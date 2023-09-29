import { useState } from "react";
import './Button.scss'
export default function Button(props) {

  const buttonStyle = {
    BoxSizing:"borderbox",
    padding:"5px 5px",
    border: 'none',
    borderRadius: '4px',
    fontSize: '8px',
    color: '#fff',
    backgroundColor: 'black',
    cursor: 'pointer',
    fontWeight:"600"
  };

  if (props.size === 'lg') {
    buttonStyle.height = "40px";
    buttonStyle.fontSize = "18px";
  }else if (props.size === 'sm') {
    buttonStyle.height = "25px";
    buttonStyle.fontSize = "10px";
  }

  if (props?.variant === "warning") buttonStyle.backgroundColor = "orangered"
  if (props?.variant === "success") buttonStyle.backgroundColor = "#238636"


  return (
    <button className="CustomButton" type={props.type} onClick={props?.onClick} style={buttonStyle}>
      {props.icon} {props.children}
    </button>
  );
}