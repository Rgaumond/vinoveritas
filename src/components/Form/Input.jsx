import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../../index.css";

const Input = (props) => {
  const [input, setInput] = useState(props.name);

  let handleChange = (e) => {
    setInput(e.target.value);
    props.handleChange(e);
  };

  let handleClear = () => {
    setInput("");
    let e = { target: {} };
    e.target.value = "";
    e.target.name = props.name;
    props.handleChange(e);
  };

  let handlePlus = () => {
    let theQty = parseInt(input);
    theQty++;
    console.log("input" + theQty);
    setInput(theQty);
    let e = { target: {} };
    e.target.value = theQty;
    e.target.name = props.name;
    props.handleChange(e);
  };

  let handleRemove = () => {
    let theQty = parseInt(input);
    if (theQty > 0) theQty--;
    console.log("input" + theQty);
    setInput(theQty);
    let e = { target: {} };
    e.target.value = theQty;
    e.target.name = props.name;
    props.handleChange(e);
  };

  useEffect(() => {
    if (props.value || props.value === 0) setInput(props.value);
    else setInput("");
  }, []);

  if (props.label !== "") {
    return (
      <>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          name={props.name}
          type={props.type}
          className={props.cssstyle}
          id={props.id}
          placeholder=""
          onChange={handleChange}
          value={props.defaultValue || ""}
        />
      </>
    );
  } else {
    return (
      <>
        <Form.Control
          name={props.name}
          type={props.type}
          className={props.cssstyle}
          id={props.id}
          placeholder=""
          onChange={handleChange}
        />
      </>
    );
  }
};

export default Input;
