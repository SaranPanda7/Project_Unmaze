import React, { useState, useEffect } from "react";
import Listview from "./listview";
import GMap from "../components/GMap";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const GOOGLE_MAP_API_KEY = "AIzaSyC4Z5Qz97EWcoCczNn2IcYvaYG0L9pe6Rk";
const RESORT_CO_ORDINATES = { lat: 15.31944, lng: 73.90257 };

const OFFICE_CO_ORDINATES = { lat: 17.739349299477045, lng: 83.31304490400785 };

const loadGoogleMapScript = (callback) => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${"AIzaSyC4Z5Qz97EWcoCczNn2IcYvaYG0L9pe6Rk"}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
};

function Map() {
  const [loadMap, setLoadMap] = useState(false);
  const [checkedbox, setChecked] = useState(true);

  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState([]);
  const [setChannel, checkChannel] = useState(false);
  const checkChange = (e) => {
    console.log(e);
    setChecked((prevState) => !prevState);
  };
  const channelChange = (b) => {
    //console.log(b);
    if (b) {
      document.getElementById("switchValue").style.display = "inline-block";
    } else {
      document.getElementById("switchValue").style.display = "none";
    }
    checkChannel((prevState) => !prevState);
  };
  const selectChange = (v) => {
    let z = v.split("_").pop();
    if (v !== "0") {
      document.getElementById("checkSwitch").style.display = "flex";
      document.getElementById("switchValue").innerText = z;
      setSelected(v);
    } else {
      document.getElementById("checkSwitch").style.display = "none";
      document.getElementById("switchValue").innerText = "";
    }
  };

  const [markerList, setmarkerList] = useState([]);

  const fetchPlaces = async () => {
    console.log("REFESH PLACES......");
    fetch(
      "https://unmaze.blackmeadow-86f5e8cd.eastasia.azurecontainerapps.io/all"
    )
      .then((response) => response.json())
      .then((data) => {
        const result = data.filter((dt) => dt.latitude != null);

        result.forEach((object) => {
          object.lat = object.latitude;
          object.lng = object.longitude;
        });

        console.log("RES:", result);
        setmarkerList(result);
      });
  };

  const fetchData = async () => {
    fetch(
      "https://unmaze.blackmeadow-86f5e8cd.eastasia.azurecontainerapps.io/allcode"
    )
      .then((response) => response.json())
      .then((data) => {
        const result = data;

        console.log("RES:", result);
        setOptionList(result);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchPlaces();
    }, 10000);
  });

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  if (!markerList || markerList.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="map">
        <div className="logo-header">
          <img src={require("../images/white-logo.png")} alt="" />
          <img src={require("../images/unmaze.png")} alt="" />
        </div>
        <div className="align-flex">
          {checkedbox ? (
            <h2>Employee Map Status</h2>
          ) : (
            <>
              <div className="channel">
                <h2>Employee Activity Status : </h2>
                <select
                  onChange={(e) => {
                    selectChange(e.target.value);
                  }}
                >
                  <option value="0">-- select channel--</option>
                  {optionList.map((option) => (
                    <option key={option.id} value={option.channelname}>
                      {option.channelname}
                    </option>
                  ))}
                </select>
                <div
                  className="toggle-btn"
                  id="checkSwitch"
                  style={{ display: "none" }}
                >
                  <div class="switch">
                    <input
                      type="checkbox"
                      name=""
                      onChange={(e) => {
                        channelChange(e.target.checked);
                      }}
                      checked={setChannel}
                    />
                    <span></span>
                  </div>
                  <label id="switchValue" style={{ display: "none",marginLeft:10 }}></label>
                </div>
              </div>
            </>
          )}

          <div className="toggle-btn">
            <label>{checkedbox ? "Grid" : "Map"} </label>
            <div className="switch">
              <input
                type="checkbox"
                onChange={(e) => {
                  checkChange(e.target.checked);
                }}
                checked={checkedbox}
              />
              <span></span>
            </div>
          </div>
        </div>
        {checkedbox ? (
          <>
            {!loadMap ? (
              <div>Loading...</div>
            ) : (
              <div className="googleMap">
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyC4Z5Qz97EWcoCczNn2IcYvaYG0L9pe6Rk",
                    language: "en",
                  }}
                  defaultCenter={OFFICE_CO_ORDINATES}
                  center={OFFICE_CO_ORDINATES}
                  zoom={15}
                  yesIWantToUseGoogleMapApiInternals
                  onGoogleApiLoaded={({ map, maps }) =>
                    new maps.Circle({
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#FF0000",
                      fillOpacity: 0.3,
                      map,
                      center: {
                        lat: OFFICE_CO_ORDINATES.lat,
                        lng: OFFICE_CO_ORDINATES.lng,
                      },
                      radius: 1000,
                    })
                  }
                >
                  {markerList.map((place) => (
                    <Marker
                      key={place.id}
                      // text={place.name}
                      lat={place.lat}
                      lng={place.lng}
                      empid={place.employeeid}
                      dta={place}
                    />
                  ))}
                </GoogleMapReact>
              </div>
            )}
          </>
        ) : (
          <Listview selectValue={select} switchValue={setChannel} />
        )}
      </div>
    </div>
  );
}

export default Map;
