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

  const checkChange = (e) => {
    console.log(e);
    setChecked((prevState) => !prevState);
  };

  const [markerList, setmarkerList] = useState([]);

  const fetchPlaces = async () => {
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

  const fetchData = () => {
    fetch
      .get('http://localhost:5080/list-categories')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
            //check the api call is success by stats code 200,201 ...etc
            setOptionList(data)
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };

useEffect(()=>{
    fetchData();
},[])

  useEffect(() => {
    fetchPlaces();
  }, []);

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  if (!markerList || markerList.length === 0) {
    return null;
  }


  // useEffect(()=>{
  //     fetchData();
  // },[])

  return (
    <div>
      <div className="map">
        <div className="logo-header">
          <img src={require("../images/white-logo.png")} alt="" />
          <img src={require("../images/Unmaze_logo2022.png")} alt="" />
        </div>
        <div className="align-flex">
          {checkedbox ? (
            <h2>Employee Map Status</h2>
          ) : (
            <>
              <div className="channel">
                <h2>Employee Activity Status</h2>
                <strong>Channel List:</strong>
                <select>
                  <option value="0">-- select channel--</option>
                  <optgroup label="Day 0 (13/10/2022)">
                    <option value="1">Goa Calling</option>
                    <option value="2">Arrival in Goa</option>
                    <option value="3">Check-in Process</option>
                    <option value="3">TEST_CHECKIN</option>
                    <option value="3">TEST_BEVERAGE</option>
                    <option value="4">EGT(Drinks)</option>
                  </optgroup>
                  <optgroup label="Day 1 (14/10/2022)">
                    <option value="5">Breakfast</option>
                    <option value="6">Town Hall</option>
                    <option value="7">Team building activities </option>
                    <option value="8">Lunch</option>
                    <option value="9">UnMaze</option>
                  </optgroup>
                  <optgroup label="Day 2 (15/10/2022)">
                    <option value="10">Breakfast</option>
                    <option value="11">Personal Day</option>
                    <option value="12">Casino</option>
                  </optgroup>
                  <optgroup label="Day 3 (16/10/2022)">
                    <option value="13">Breakfast</option>
                    <option value="14">Check-out Process</option>
                  </optgroup>
                </select>
                <label for="checkActive">
                  <input type="checkbox" id="checkActive" name="" />
                </label>
              </div>
            </>
          )}

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
          <Listview />
        )}
      </div>
    </div>
  );
}

export default Map;
