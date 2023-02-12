import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Input from "../Form/Input";
import Select from "../Form/Select";

const WineDetail = (props) => {
  const [wines, setWines] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [wineGroup, setWineGroup] = React.useState("Rouge");

  //const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSearchValue("");

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
  });
  const sortByName = (wines) => {
    wines.sort((a, b) => (a.name > b.name ? 1 : -1));
    return wines;
  };

  const updateView = (wineid, wineName, wineGroup, qty) => {
    let locObj = {};
    locObj.winegroup = wineGroup;
    locObj.wineid = wineid;
    locObj.winename = wineName;
    locObj.locations = props.locationArray;
    locObj.qty = qty;
    runUpdateView(locObj);
  };

  const runUpdateView = async (locObj) => {
    return fetch(process.env.REACT_APP_ENPOINT_URL + "/locations/updateMany", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(locObj),
    }).then(() => {
      fetch(process.env.REACT_APP_ENPOINT_URL + "/wines/updateById", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: locObj.wineid,
          qty: locObj.locations.length + locObj.qty,
        }),
      }).then((data) => {
        window.location.href = "../Cellar";
      });
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
          fetch(process.env.REACT_APP_ENPOINT_URL + "/wines/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data.obj[0]),
          }).then((data) => {
            window.location.href = "../Cellar";
          });
        });
    });
  };
  const fetchData = () => {
    return fetch(process.env.REACT_APP_ENPOINT_URL + "/wines")
      .then((response) => response.json())
      .then((data) => {
        setWines(sortByName(data.obj));
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
                <Select handleChange={filterRed} list="type" name="type" />
              </div>
            </div>
            {filteredWine.map((wine) => {
              return (
                <div
                  className={"list-item-container"}
                  onClick={() => {
                    updateView(wine._id, wine.name, wine.group, wine.qty);
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
    let currentWine = wines.find((obj) => {
      return obj._id === props.wineid;
    });
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
            <Modal.Title>Votre choix</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className={"wine-info-img"}
              style={{
                backgroundImage: "url(" + currentWine.img + ")",
              }}
            >
              <div className={"wine-info"}>
                {currentWine.name} {currentWine.millesime}
                <br />
                reste: {currentWine.qty}
              </div>
            </div>
          </Modal.Body>
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
