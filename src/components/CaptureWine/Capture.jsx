import React, { useState, useEffect } from "react";
import Input from "../Form/Input";
import Select from "../Form/Select";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
const initialValues = {
  name: "",
  qty: "0",
  productor: "",
  millesime: "",
  grape: "",
  group: "",
  price: "",
  country: "",
  commentary: "",
  region: "",
  img: "",
};
const Capture = (props) => {
  const [currentWine, setCurrentWine] = useState({});
  const [dataIsReturned, setDataReturned] = useState(false);

  const params = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentWine({
      ...currentWine,
      [name]: value,
    });
  };

  const addWine = (values) => {
    //console.log(values);
    return fetch(process.env.REACT_APP_ENPOINT_URL + "/wines/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then(() => {
      window.location.href = "./";
    });
  };

  const updateWine = (values) => {
    return fetch(process.env.REACT_APP_ENPOINT_URL + "/wines/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then(() => {
      window.location.href = "../";
    });
  };

  const fetchData = () => {
    if (params.wineid) {
      return fetch(
        process.env.REACT_APP_ENPOINT_URL + "/wines/" + params.wineid
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrentWine(data.obj[0]);
          setDataReturned(true);
          // values = JSON.parse(JSON.stringify(data.wine));
          // setDataReturned(true);
          //console.log(data.wine[0]);
        });
    } else {
      setCurrentWine(initialValues);
      setDataReturned(true);
    }
  };

  const handleSubmit = (e) => {
    // console.log(values);
    if (params.wineid) updateWine(currentWine);
    else addWine(currentWine);
    e.preventDefault();
  };

  const handleDelete = (e) => {
    // console.log(values);
    if (params.wineid) updateWine(currentWine);
    else addWine(currentWine);
    e.preventDefault();
  };

  const displayButtons = () => {
    if (params.wineid) {
      document.getElementById("submitButton").innerHTML = "Modifier";
      document.getElementById("deleteButton").innerHTML = "Éliminer";
      document.getElementById("qty").readOnly = true;
      document.getElementById("qty").addEventListener("click", () => {
        window.location.href = "../Cellar/" + params.wineid;
      });
    } else {
      document.getElementById("submitButton").innerHTML = "Enregistrer";
      document.getElementById("deleteButton").innerHTML = "Annuler";
      document.getElementById("qty").readOnly = false;
      document.getElementById("qty").addEventListener("click", () => {
        return false;
      });
    }
  };

  //Called once after the render (component is mounted) - the array is the dependency array basically the parameters which trigger the function is they are changed
  useEffect(() => {
    fetchData();
    displayButtons();
  }, []);

  return (
    <>
      <div className={"list-item-container"}>
        <Input
          id="wineName"
          type="text"
          message="Nom du vin"
          label="Nom"
          name="name"
          handleChange={handleChange}
          defaultValue={currentWine.name}
        ></Input>
      </div>
      <div className={"list-item-container"}>
        <Select
          label="Type"
          name="group"
          handleChange={handleChange}
          list="type"
          defaultValue={currentWine.group}
        />
      </div>
      <div className={"list-item-container"}>
        <Select
          label="Raisin"
          name="grape"
          handleChange={handleChange}
          list="grapes"
          defaultValue={currentWine.grape}
        />
      </div>
      <div className={"list-item-container"}>
        <Select
          label="Millésime"
          name="millesime"
          handleChange={handleChange}
          list="millesime"
          defaultValue={currentWine.millesime}
        />
      </div>
      <div className={"list-item-container"}>
        <Select
          label="Pays"
          name="country"
          handleChange={handleChange}
          list="country"
          defaultValue={currentWine.country}
        />
      </div>

      <div className={"medium-input-container"}>
        <Input
          id="qty"
          label="Qtée"
          type="number"
          name="qty"
          disabled="true"
          handleChange={handleChange}
          defaultValue={currentWine.qty}
          css="medium-input"
        ></Input>
      </div>
      <div className={"medium-input-container"}>
        <Input
          id="price"
          label="Coût"
          type="number"
          name="price"
          handleChange={handleChange}
          defaultValue={currentWine.price}
          css="medium-input"
        ></Input>
      </div>
      <div className={"list-item-container"}>
        <Input
          id="comments"
          message="Commentaires"
          type="area"
          label="Commentaires"
          name="commentary"
          handleChange={handleChange}
          defaultValue={currentWine.commentary}
          cssstyle="comment-area"
        ></Input>
      </div>
      <div className={"list-item-container"}>
        <Input
          id="img"
          type="text"
          message="Image"
          label="Image"
          name="img"
          handleChange={handleChange}
          defaultValue={currentWine.img}
        ></Input>
      </div>
      <div className={"button-container"}>
        <Button
          id="deleteButton"
          className={"wine-button"}
          variant="danger"
          onClick={handleSubmit}
        >
          Annuler
        </Button>
        <Button
          id="submitButton"
          className={"wine-button"}
          variant="success"
          onClick={handleDelete}
        >
          Enregistrer
        </Button>
      </div>
    </>
  );
};

export default Capture;
