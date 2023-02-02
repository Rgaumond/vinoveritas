import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../../index.css";
const Select = (props) => {
  // Raisin
  const [data, setData] = useState([]);
  const [dataIsReturned, setDataReturned] = useState(false);

  const [inputs, setInputs] = useState({
    [props.name]: "",
  });
  let handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    props.handleChange(e);
  };

  const fetchData = () => {
    let theURL = "";
    if (props.list === "grapes")
      theURL = process.env.REACT_APP_ENPOINT_URL + "/grapes";
    else if (props.list === "type")
      theURL = process.env.REACT_APP_ENPOINT_URL + "/winetype";
    else if (props.list === "millesime")
      theURL = process.env.REACT_APP_ENPOINT_URL + "/millesime";
    else if (props.list === "country")
      theURL = process.env.REACT_APP_ENPOINT_URL + "/country";
    console.log(theURL);
    return fetch(theURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data.obj);
        setDataReturned(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataIsReturned) {
    if (props.label !== "") {
      return (
        <>
          <Form.Label>{props.label}</Form.Label>
          <Form.Select
            onChange={handleChange}
            aria-label="Default select example"
            size="1"
            name={props.name}
            value={props.defaultValue || ""}
            className={props.css}
          >
            <option>{props.name}</option>
            {data.map((li) => (
              <option value={li.name}>{li.name}</option>
            ))}
          </Form.Select>
        </>
      );
    } else {
      <Form.Select
        onChange={handleChange}
        aria-label="Default select example"
        size="1"
        name={props.name}
        value={props.defaultValue || ""}
      >
        <option>{props.name}</option>
        {data.map((li) => (
          <option value={li.name}>{li.name}</option>
        ))}
      </Form.Select>;
    }
  }
};

export default Select;
