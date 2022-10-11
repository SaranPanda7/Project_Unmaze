import React, { useState, useEffect } from "react";
import Listview from "./listview";
import GMap from "../components/GMap";

const GOOGLE_MAP_API_KEY = "AIzaSyC4Z5Qz97EWcoCczNn2IcYvaYG0L9pe6Rk";

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

  const checkChange = (e) => {
    //e.persist();
    console.log(e);
    setChecked((prevState) => !prevState);
  };

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);
  return (
    <div>
      <div className="map">
        <div className="logo-header">
          <img src={require("../images/white-logo.png")} alt="" />
          <img src={require("../images/Unmaze_logo2022.png")} alt="" />
        </div>
        <div className="align-flex">
          <h2>
            {checkedbox ? "Employee Map Status" : "Employee Activity Status:"}
          </h2>
          <div className="toggle-btn">
            <label>{checkedbox ? "Map" : "Grid"} </label>
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
                <GMap />
              </div>
            )}
          </>
        ) : (
          <Listview />
        )}
      </div>
    </div>
  );
}

export default Map;
