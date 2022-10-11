import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const GMap = () => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  const [showlistData, setShowlistData] = useState([]);
  //const CollectlistData =

  useEffect(() => {
    //CollectlistData();
    (async () => {
      try {
        let response = await axios.get(
          "https://unmaze.blackmeadow-86f5e8cd.eastasia.azurecontainerapps.io/all",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data);

          setShowlistData(response.data);
        }
      } catch (error) {
        setShowlistData(null);
      }
    })();
  }, []);

  const iconList = {
    icon1:
      "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png",

    icon2:
      "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png",

    icon3:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/boy-512.png",

    icon4:
      "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png",

    icon5:
      "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png",

    icon6:
      "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png",

    icon7:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/boy-512.png",

    icon8:
      "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png",

    icon9:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/boy-512.png",

    icon10:
      "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png",
  };

  const markerList = [
    { id: 1, lat: 15.2993, lng: 74.124, icon: iconList.icon1 },
    { id: 2, lat: 15.496777, lng: 73.827827, icon: iconList.icon2 },
    { id: 3, lat: 15.3188321195, lng: 73.9021879017, icon: iconList.icon3 },
    { id: 4, lat: 15.381564, lng: 73.995639, icon: iconList.icon4 },
    { id: 5, lat: 15.484511, lng: 73.95546916, icon: iconList.icon5 },
    {
      id: 6,
      lat: 15.390028999309168,
      lng: 73.81358174962674,
      icon: iconList.icon6,
    },
    {
      id: 7,
      lat: 15.419817923743885,
      lng: 74.06832723302517,
      icon: iconList.icon7,
    },
    {
      id: 8,
      lat: 15.350965950843447,
      lng: 74.13905172032986,
      icon: iconList.icon8,
    },
    {
      id: 9,
      lat: 15.221144775923987,
      lng: 74.0587141959158,
      icon: iconList.icon9,
    },
    {
      id: 10,
      lat: 15.273811083401151,
      lng: 73.9146966158541,
      icon: iconList.icon10,
    },
  ];

  markerList[1].circle = {
    radius: 5000,
    options: {
      strokeColor: "#BDD0D8",
    },
  };

  useEffect(() => {
    googleMap = initGoogleMap();
    console.log(showlistData);
    var bounds = new window.google.maps.LatLngBounds();
    showlistData.map((x) => {
      const marker = createMarker(x);
      bounds.extend(marker.position);
    });
    googleMap.fitBounds(bounds);
  }, []);

  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: 15.2993, lng: 74.124 },
      zoom: 8,
    });
  };

  // create marker on google map
  const createMarker = (markerObj) =>
    new window.google.maps.Marker({
      position: { lat: markerObj.lat, lng: markerObj.lng },
      map: googleMap,
      icon: {
        url: markerObj.icon,
        // set marker width and height
        scaledSize: new window.google.maps.Size(30, 30),
      },
    });

  return <div ref={googleMapRef} className="location" />;
};

export default GMap;
