import React, { useState, useEffect } from "react";
import WineListModal from "../Modals/WineListModal";
import styles from "./location.css";

const Cellar = () => {
  const [locations, setlocations] = useState([]);
  const [locationId, setlocationId] = useState();
  const [open, setOpen] = React.useState(false);
  const [wineId, setWineId] = React.useState("");
  const [currentWine, setCurrentWine] = React.useState("");

  // const handleChange = (e) => {
  //   handleChange(e);
  // };

  const handleClick = (e) => {
    let target = e.target.parentNode;
    setlocationId(target.getAttribute("locationid"));
    setWineId(target.getAttribute("wineid"));
    setCurrentWine(target.getAttribute("winename"));
    setOpen(true);
  };

  const handleOctogonClick = (e) => {
    let target = e.target.parentNode.parentNode;
    setlocationId(target.getAttribute("locationid"));
    setWineId(target.getAttribute("wineid"));
    setCurrentWine(target.getAttribute("winename"));
    setOpen(true);
  };
  const fetchData = () => {
    return fetch(process.env.REACT_APP_ENPOINT_URL + "/locations")
      .then((response) => response.json())
      .then((data) => {
        data.locations.sort((a, b) => (a.name > b.name ? 1 : -1));
        setlocations(data.locations);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setColor = (color) => {
    if (color === "Rouge") return <div className="redBottleWine"></div>;
    else if (color === "Blanc")
      return <div className="redBottleWine whiteBottleWine"></div>;
    else return <div className="redBottleWine noBottleWine"></div>;
  };

  const setOctagonColor = (color) => {
    if (color === "Rouge") return <div class="circleRed"></div>;
    else if (color === "Blanc") return <div class="circleWhite"></div>;
    else return <div class="circleTransparent"></div>;
  };

  return (
    <div className="main_container">
      <WineListModal
        open={open}
        wineid={wineId}
        locationid={locationId}
        currentwine={currentWine}
        setOpen={setOpen}
      />
      <div class="cellar_container">
        <div className="c_column column_left">
          {locations.map((loc) => {
            let style = "c_wineRack";
            if (loc._id.startsWith("ca")) {
              return (
                <div
                  className={style}
                  locationid={loc._id}
                  wineid={loc.wineid}
                  winename={loc.winename}
                  winegroup={loc.winegroup}
                  onClick={handleClick}
                >
                  {setColor(loc.winegroup)}
                </div>
              );
            }
          })}
        </div>
        <div className="c_column column_right">
          {locations.map((loc) => {
            let style = "c_wineRack";
            if (loc._id.startsWith("cb")) {
              return (
                <div
                  className={style}
                  locationid={loc._id}
                  wineid={loc.wineid}
                  winename={loc.winename}
                  winegroup={loc.winegroup}
                  onClick={handleClick}
                >
                  {setColor(loc.winegroup)}
                </div>
              );
            }
          })}
        </div>
        <div className="c_center">
          {locations.map((loc) => {
            let style = "c_shelves";
            if (loc._id.startsWith("cc")) {
              return (
                <div
                  className={style}
                  locationid={loc._id}
                  wineid={loc.wine}
                  onClick={handleClick}
                >
                  {loc.name}
                </div>
              );
            }
          })}
        </div>
        <div className="c_column column_left">
          {locations.map((loc) => {
            let style = "c_wineRack";
            if (loc._id.startsWith("cd")) {
              return (
                <div
                  className={style}
                  locationid={loc._id}
                  wineid={loc.wineid}
                  winename={loc.winename}
                  winegroup={loc.winegroup}
                  onClick={handleClick}
                >
                  {setColor(loc.winegroup)}
                </div>
              );
            }
          })}
        </div>
        <div className="c_column column_right">
          {locations.map((loc) => {
            if (loc._id.startsWith("ce")) {
              let style = "c_wineRack";
              return (
                <div
                  className={style}
                  locationid={loc._id}
                  wineid={loc.wineid}
                  winename={loc.winename}
                  winegroup={loc.winegroup}
                  onClick={handleClick}
                >
                  {setColor(loc.winegroup)}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div class="kitchen_cellar_container">
        {locations.map((loc) => {
          let style = "octagon";
          if (loc._id.startsWith("kc")) {
            return (
              <div
                className={style}
                locationid={loc._id}
                wineid={loc.wineid}
                winename={loc.winename}
                winegroup={loc.winegroup}
                onClick={handleOctogonClick}
              >
                <div>{setOctagonColor(loc.winegroup)}</div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
export default Cellar;
