import React, { useState, useEffect } from "react";
// import Map from "./Map";
import axios from "axios";

function Listview() {
  const [listData, setlistData] = useState([]);
  const [showCard, setShowCard] = useState(false);

  const [Popdta, setPopdta] = useState({
    id: "",
    employeeid: "",
    tittle: "",
    firstname: "",
    lastname: "",
    alternativecontactnumber: "",
    emailid: "",
    latitude: "",
    longitude: "",
    phonenumber: "",
    roomno: "",
  });
  const myCard = (data) => {
    console.log(data);
    // e.preventDefault();
    setPopdta(data);
    setShowCard(true);
  };
  const myPopup = (e) => {
    e.preventDefault();
    setShowCard(false);
  };

  const getlistData = async () => {
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

        const perChunk = 5; // items per chunk

        const result = response.data.reduce((resultArray, item, index) => {
          const chunkIndex = Math.floor(index / perChunk);

          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
          }

          resultArray[chunkIndex].push(item);

          return resultArray;
        }, []);

        setlistData(result);
      }
    } catch (error) {
      setlistData(null);
    }
  };

  useEffect(() => {
    getlistData();
  }, []);
  const Popup = ({ subdata }) => (
    <div class="popUp">
      <div class="popUp-content">
        <>
          <div class="popUp-heading">
            <h2>{subdata.firstname}</h2>
            <span class="popDown" onClick={myPopup}>
              &times;
            </span>
          </div>
          <div class="popUp-body">
            <div class="profile">
              <img
                src={`https://evolutyzblobimages.blob.core.windows.net/unmaze/${subdata.employeeid}.jpg`}
                alt={`${subdata.employeeid}`}
              />
              <h5>
                {/* <small>Employee ID:</small> */}
                <strong>
                  <i class="fa fa-address-card"></i>

                  {" " + subdata.employeeid}
                </strong>
              </h5>
            </div>
            <div class="infos">
              <ul class="personal-info">
                <li>
                  {/* <div class="title"></div> */}
                  <div class="text">
                    <i class="fa fa-envelope"></i> 
                    { "  " + subdata.emailid}
                  </div>
                </li>
                <li>
                  {/* <div class="title">Relationship</div> */}
                  <div class="text">
                    <i class="fa fa-phone"></i> { "   " + subdata.phonenumber}
                  </div>
                </li>
                <li>
                  {/* <div class="title">Phone</div> */}
                  <div class="text">
                    <i class="fa fa-mobile"></i> { "  " + subdata.phonenumber}
                    (Alt)
                  </div>
                </li>
                <li>
                  {/* <div class="title">Phone</div> */}
                  <div class="text">
                    <i class="fa fa-archive"></i> { "  " + subdata.roomno}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      </div>
    </div>
  );
  return (
    <>
      <div class="emp-grid">
        {listData.map((data) => (
          <div class="bordergrid">
            {data.map((subdata) => (
              <div class="grid">
                <div
                  class="profile-widget status"
                  onClick={() => {
                    myCard(subdata);
                  }}
                >
                  <div class="emp-img">
                    <img
                      src={`https://evolutyzblobimages.blob.core.windows.net/unmaze/${subdata.employeeid}.jpg`}
                      alt={`${subdata.employeeid}`}
                    />
                  </div>
                  <h4 class="emp-name">{subdata.firstname}</h4>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {showCard ? <Popup subdata={Popdta} /> : null}
    </>
   
  );
}

export default Listview;
