import React, { useEffect, useRef } from "react";


const GMap = () => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  
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
    {id:1, lat: 15.2993, lng: 74.124, icon: iconList.icon1 },
    {id:2, lat: 15.496777, lng: 73.827827, icon: iconList.icon2 },
    {id:3, lat: 15.3188321195, lng: 73.9021879017, icon: iconList.icon3 },
    {id:4, lat: 15.381564, lng: 73.995639, icon: iconList.icon4 },
    {id:5, lat: 15.484511, lng: 73.95546916, icon: iconList.icon5},
    {id:6, lat: 15.390028999309168, lng: 73.81358174962674, icon: iconList.icon6 },
    {id:7, lat: 15.419817923743885, lng: 74.06832723302517, icon: iconList.icon7},
    {id:8, lat: 15.350965950843447, lng: 74.13905172032986, icon: iconList.icon8},
    {id:9, lat: 15.221144775923987, lng: 74.0587141959158, icon: iconList.icon9},
    {id:10, lat: 15.273811083401151, lng: 73.9146966158541, icon: iconList.icon10},

    { lat: 15.2993, lng: 74.124, icon: iconList.icon1 },
    { lat: 15.996777, lng: 73.827827, icon: iconList.icon2 },
    { lat: 15.3188321195, lng: 73.9021879017, icon: iconList.icon3 },
    { lat: 15.781564, lng: 73.995639, icon: iconList.icon4 },
    { lat: 15.484511, lng: 73.95546916, icon: iconList.icon5},
    { lat: 15.490028999309168, lng: 73.81358174962674, icon: iconList.icon6 },
    { lat: 15.519817923743885, lng: 74.06832723302517, icon: iconList.icon7},
    { lat: 15.450965950843447, lng: 74.13905172032986, icon: iconList.icon8},
    { lat: 15.221144775923987, lng: 74.0587141959158, icon: iconList.icon9},
    { lat: 15.273811083401151, lng: 73.9146966158541, icon: iconList.icon10},

    { lat: 15.25845, lng: 74.156235, icon: iconList.icon1 },
    { lat: 15.99448, lng: 73.8251223, icon: iconList.icon2 },
    { lat: 15.318545, lng: 73.9054626, icon: iconList.icon3 },
    { lat: 15.7851622, lng: 73.99245565, icon: iconList.icon4 },
    { lat: 15.4845123, lng: 73.952452, icon: iconList.icon5},
    { lat: 15.490252, lng: 73.8135121, icon: iconList.icon6 },
    { lat: 15.519812152, lng: 74.065523, icon: iconList.icon7},
    { lat: 15.45025452, lng: 74.13904455, icon: iconList.icon8},
    { lat: 15.25562657, lng: 74.054862, icon: iconList.icon9},
    { lat: 15.27552626, lng: 73.8575262, icon: iconList.icon10},

    { lat: 15.12542, lng: 74.124455, icon: iconList.icon1 },
    { lat: 15.524521, lng: 73.857967, icon: iconList.icon2 },
    { lat: 15.45482133, lng: 73.4585459017, icon: iconList.icon3 },
    { lat: 15.215485, lng: 73.255452639, icon: iconList.icon4 },
    { lat: 15.25468566, lng: 73.5454221546916, icon: iconList.icon5},
    { lat: 15.245623162, lng: 73.7548454962674, icon: iconList.icon6 },
    { lat: 15.514212521, lng: 74.0451123302517, icon: iconList.icon7},
    { lat: 15.451212222, lng: 74.1421512032986, icon: iconList.icon8},
    { lat: 15.548462215, lng: 74.4152451959158, icon: iconList.icon9},
    { lat: 15.401151, lng: 73.54256566158541, icon: iconList.icon10},

    { lat: 15.396021072109027, lng: 73.9670628038346, icon: iconList.icon1 },  
    { lat: 15.395690069632332, lng: 73.96586117415166, icon: iconList.icon2 },
    { lat: 15.40514961993657, lng: 73.95768397901244, icon: iconList.icon3 },
    { lat: 15.407838877503444, lng: 73.94927257123193, icon: iconList.icon4 },
    { lat:15.410817706816418, lng: 73.94927257123193, icon: iconList.icon5},
    { lat: 15.411976128909801, lng:  73.96480792641839, icon: iconList.icon6 },
    { lat: 15.416196040503326, lng: 73.95364993650547, icon: iconList.icon7},
    { lat:15.416568381529643, lng: 73.94219153917183, icon: iconList.icon8},
    { lat:15.415285870741146, lng: 73.96729701647587, icon: iconList.icon9},
    { lat: 15.395923133507543, lng: 73.96609538679294, icon: iconList.icon10},

    { lat: 15.402479203701857, lng: 74.00696273173578, icon: iconList.icon1 }, 
    { lat: 15.390380607957747, lng: 74.02696831049406, icon: iconList.icon2 },
    { lat: 15.409843221791856, lng: 74.05333930067543, icon: iconList.icon3 },
    { lat: 15.398291375691667, lng: 74.13729616476719, icon: iconList.icon4 },
    { lat: 15.28300752865493, lng: 74.16870091310521, icon: iconList.icon5},
    { lat: 15.284497839460425, lng: 74.1468999174292, icon: iconList.icon6 },
    { lat: 15.293936228522403, lng: 74.15419552621842, icon: iconList.icon7},
    { lat: 15.294019019528216, lng: 74.1820905010007, icon: iconList.icon8},
    { lat: 15.282345164896839, lng: 74.12947628702673, icon: iconList.icon9},
    { lat: 15.260651596005793, lng: 74.16810009826374, icon: iconList.icon10},

    { lat: 15.468559101270241, lng: 75.1355129597006, icon: iconList.icon1 }, 
    { lat: 15.528146068789544, lng: 75.162793294371, icon: iconList.icon2 },
    { lat: 15.581058883004962, lng: 75.15879217861934, icon: iconList.icon3 },
    { lat: 15.528146068789544, lng:  75.162793294371, icon: iconList.icon4 },
    { lat: 15.581058883004962, lng: 75.15879217861934, icon: iconList.icon5},
    { lat: 15.368274116525441, lng: 75.12605577701487, icon: iconList.icon6} ,
    { lat: 15.432680617219937, lng: 75.427121003956, icon: iconList.icon7},
    { lat: 15.432680617219937, lng: 75.427121003956, icon: iconList.icon8},
    { lat: 15.595020434714245, lng: 75.66598573106168, icon: iconList.icon9},
    { lat: 15.392256243408612, lng: 75.72214514966021, icon: iconList.icon10},

     { lat: 15.352546089056947, lng: 75.29009202257562, icon: iconList.icon1 },
     { lat: 15.583818774941836, lng: 74.78013909947332, icon: iconList.icon2 },
     { lat: 15.3188321195, lng: 73.9021879017, icon: iconList.icon3 },
    { lat: 15.781564, lng: 73.995639, icon: iconList.icon4 },
     { lat: 15.484511, lng: 73.95546916, icon: iconList.icon5},
     { lat: 15.532783758656576, lng: 78.51385941663308, icon: iconList.icon6 },
     { lat: 15.532783758656576, lng:  78.51385941663308, icon: iconList.icon7},
     { lat: 15.532783758656576, lng: 78.51385941663308, icon: iconList.icon8},
     { lat: 15.532783758656576, lng:78.51385941663308, icon: iconList.icon9},
     { lat: 15.532783758656576, lng: 78.51385941663308 , icon: iconList.icon10},
  ];

  markerList[1].circle = {
    radius: 5000,
    options: {
      strokeColor: '#BDD0D8',
    },
  }

  useEffect(() => {
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds();
    markerList.map((x) => {
      const marker = createMarker(x);
      bounds.extend(marker.position);
    });
    googleMap.fitBounds(bounds); 
  }, []);

  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: -34.397, lng: 150.644 },
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
