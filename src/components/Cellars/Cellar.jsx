import React, { useState, useEffect } from "react";
import WineListModal from "../Modals/WineListModal";
import styles from "./location.css";
import { useParams } from "react-router-dom";

const Cellar = () => {
  const [locations, setlocations] = useState([]);

  const [locationId, setlocationId] = useState();
  const [locationArray, setlocationArray] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [wineId, setWineId] = React.useState("");
  const [currentWine, setCurrentWine] = React.useState("");
  const params = useParams();
  let center_counter = 0;
  // const handleChange = (e) => {
  //   handleChange(e);
  // };
  let selectedLocations = [];
  const handleClick = (locationid, wineid, winename) => {
    if (!wineid) {
      document.getElementById("footerContainer").style.display = "flex";
      document.getElementById(locationid).style.backgroundColor =
        "rgb(14, 223, 243)";
      if (!selectedLocations.includes(locationid))
        selectedLocations.push(locationid);
    } else {
      setlocationId(locationid);
      setWineId(wineid);
      setCurrentWine(winename);
      setOpen(true);
    }
  };

  const placeWine = () => {
    setlocationArray(selectedLocations);
    setOpen(true);
  };

  const refresh = () => {
    window.location.reload();
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

  const setColor = (color, wineID) => {
    if (wineID === params.wineid)
      return <div className="redBottleWine blueBottleWine"></div>;
    else {
      if (color === "Rouge") return <div className="redBottleWine"></div>;
      else if (color === "Blanc" || color === "Mousseux")
        return <div className="redBottleWine whiteBottleWine"></div>;
      else return <div className="redBottleWine noBottleWine"></div>;
    }
  };

  const setColorShelves = (color, wineID) => {
    if (wineID === params.wineid)
      return (
        <div className="redBottleWine blueBottleWine c_shelve_rotate "></div>
      );
    else {
      if (color === "Rouge")
        return <div className="redBottleWine c_shelve_rotate "></div>;
      else if (color === "Blanc" || color === "Mousseux")
        return (
          <div className="redBottleWine whiteBottleWine c_shelve_rotate "></div>
        );
      else
        return (
          <div className="redBottleWine noBottleWine c_shelve_rotate "></div>
        );
    }
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
        locationArray={locationArray}
        setOpen={setOpen}
      />
      <div class="inner_container">
        <div class="cellar_container">
          <div className="c_column">
            {locations.map((loc) => {
              let style = "c_wineRack";

              if (loc._id.startsWith("ca")) {
                return (
                  <div
                    className={style}
                    id={loc._id}
                    onClick={() => {
                      handleClick(loc._id, loc.wineid, loc.winename);
                    }}
                  >
                    {setColor(loc.winegroup, loc.wineid)}
                  </div>
                );
              }
            })}
          </div>
          <div className="c_column">
            {locations.map((loc) => {
              let style = "c_wineRack";
              if (loc._id.startsWith("cb")) {
                return (
                  <div
                    className={style}
                    id={loc._id}
                    onClick={() => {
                      handleClick(loc._id, loc.wineid, loc.winename);
                    }}
                  >
                    {setColor(loc.winegroup, loc.wineid)}
                  </div>
                );
              }
            })}
          </div>
          <div className="c_center">
            {locations.map((loc) => {
              let style = "c_shelves";

              if (loc._id.startsWith("cc")) {
                if (center_counter > 0) style = "c_shelves c_shelve_border";
                center_counter++;
                return (
                  <div
                    className={style}
                    id={loc._id}
                    onClick={() => {
                      handleClick(loc._id, loc.wineid, loc.winename);
                    }}
                  >
                    {setColorShelves(loc.winegroup, loc.wineid)}
                  </div>
                );
              }
            })}
          </div>
          <div className="c_column">
            {locations.map((loc) => {
              let style = "c_wineRack";
              if (loc._id.startsWith("cd")) {
                return (
                  <div
                    className={style}
                    id={loc._id}
                    onClick={() => {
                      handleClick(loc._id, loc.wineid, loc.winename);
                    }}
                  >
                    {setColor(loc.winegroup, loc.wineid)}
                  </div>
                );
              }
            })}
          </div>
          <div className="c_column">
            {locations.map((loc) => {
              if (loc._id.startsWith("ce")) {
                let style = "c_wineRack";
                return (
                  <div
                    className={style}
                    id={loc._id}
                    onClick={() => {
                      handleClick(loc._id, loc.wineid, loc.winename);
                    }}
                  >
                    {setColor(loc.winegroup, loc.wineid)}
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
                  id={loc._id}
                  onClick={() => {
                    handleClick(loc._id, loc.wineid, loc.winename);
                  }}
                >
                  <div>{setOctagonColor(loc.winegroup)}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div id="footerContainer">
        <div class="footerButtonReset" onClick={refresh}>
          Effacer
        </div>
        <div class="footerButtonAdd" onClick={placeWine}>
          Ajouter
        </div>
      </div>
    </div>
  );
};
export default Cellar;
