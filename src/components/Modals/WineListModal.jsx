import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Input from "../Form/Input";
import Select from "../Form/Select";

const groups = [
  { id_: 0, name: "Rouge" },
  { id_: 1, name: "Blanc" },
  { id_: 2, name: "Rosé" },
  { id_: 3, name: "Mousseux" },
  { id_: 4, name: "Champagne" },
];
const WineDetail = (props) => {
  const [wines, setWines] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [wineGroup, setWineGroup] = React.useState("Rouge");
  //const handleOpen = () => setOpen(true);
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filterRed = (e) => {
    setWineGroup(e.target.value);
    // setGroup(e.target.value);
    setSearchValue(searchValue);
  };

  const filteredWine = wines.filter((wine) => {
    if (wine.qty > 0) {
      if (searchValue === "" && wine.group === wineGroup) {
        // let result = wines.find((a) => a.group === wineGroup);
        return wine;
      } else {
        if (
          wine.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          wine.group === wineGroup
        )
          return wine;
      }
    }
  });
  const sortByName = (wines) => {
    wines.sort((a, b) => (a.name > b.name ? 1 : -1));
    console.log(props.wineid);
    return wines;
  };

  const updateView = (wineid, wineName, wineGroup) => {
    let locObj = {};
    locObj._id = props.locationid;
    locObj.winegroup = wineGroup;
    locObj.wineid = wineid;
    locObj.winename = wineName;
    return fetch(process.env.REACT_APP_ENPOINT_URL + "/locations/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(locObj),
    }).then((data) => {
      window.location.href = process.env.REACT_APP_HOME + "/cellar";
    });
  };
  const takeWine = (wineid, locationId) => {
    let locObj = {};
    locObj._id = locationId;
    locObj.wineid = "";
    locObj.winename = "";
    locObj.winegroup = "";
    return fetch(process.env.REACT_APP_ENPOINT_URL + "/locations/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(locObj),
    }).then((data) => {
      fetch(process.env.REACT_APP_ENPOINT_URL + "/wines/take/" + wineid, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(locObj),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(JSON.stringify(data.wine[0]));
          fetch(process.env.REACT_APP_ENPOINT_URL + "/wines/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data.wine[0]),
          }).then((data) => {
            window.location.href = process.env.REACT_APP_HOME + "/Cellar";
          });
        });
    });
  };
  const fetchData = () => {
    return fetch(process.env.REACT_APP_ENPOINT_URL + "/wines")
      .then((response) => response.json())
      .then((data) => {
        setWines(sortByName(data.wines));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!props.wineid || props.wineid === "") {
    return (
      <>
        <Modal show={props.open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sélectionner le vin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                backgroundColor: "#fff ",
                position: "sticky ",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexGrow: 1,
                  backgroundColor: "#fff ",
                }}
              >
                <Input
                  id="wineName"
                  message="Nom du vin"
                  label=""
                  hasLabel="false"
                  handleChange={handleInputChange}
                ></Input>
              </div>
              <div style={{ display: "flex", right: 0 }}>
                <Select handleChange={filterRed} list={groups} name="Type" />
              </div>
            </div>
            {filteredWine.map((wine) => {
              return (
                <div
                  className={"list-item-container"}
                  onClick={() => {
                    updateView(wine._id, wine.name, wine.group);
                  }}
                >
                  <div className={""}>
                    {wine.name} {wine.millesime}
                  </div>
                </div>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal
          show={props.open}
          onHide={handleClose}
          wineid={props.wineid}
          winename={props.currentwine}
          locationid={props.locationid}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.currentwine}</Modal.Title>
          </Modal.Header>
          <Modal.Body>We have wine!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                takeWine(props.wineid, props.locationid);
                handleClose();
              }}
            >
              Prendre
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
};

export default WineDetail;
