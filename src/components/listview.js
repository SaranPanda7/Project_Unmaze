import React, { useState, useEffect } from "react";
import axios from "axios";

const Listview = (props) => {
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
    setPopdta(data);
    setShowCard(true);
  };
  const myPopup = (e) => {
    e.preventDefault();
    setShowCard(false);
  };

  const getlistData = async (channelname, checkChannel) => {
    try {
      let response = "";
      var j;
      if (channelname !== "") {
        console.log("ABC");

        response = await axios.post(
          "https://unmaze.blackmeadow-86f5e8cd.eastasia.azurecontainerapps.io/dashboard",

          JSON.stringify({
            channelName: channelname,
          }),

          {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
          }
        );
        j = response.data;
        if (checkChannel) {
          j = j
            .filter(function (item) {
              return item.status === "1";
            })
            .map(function (a) {
              return a;
            });
        } else {
          j = j
            .filter(function (item) {
              return item.status === "0";
            })
            .map(function (e) {
              return e;
            });
        }

        console.log("response", j);
      } else {
        console.log("XYZ");

        response = await axios.get(
          "https://unmaze.blackmeadow-86f5e8cd.eastasia.azurecontainerapps.io/all",

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        j = response.data;
        j.forEach((object) => {
          object.status = null;
        });
      }

      if (response.status === 200) {
        console.log(response.data);

        const perChunk = 5; // items per chunk

        const result = j.reduce((resultArray, item, index) => {
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
    getlistData(props.selectValue, props.switchValue);
  }, [props.selectValue, props.switchValue]);

  const Popup = ({ subdata }) => (
    <div className="popUp">
      <div className="popUp-content">
        <>
          <div className="popUp-heading">
            <h2>{subdata.firstname}</h2>
            <span className="popDown" onClick={myPopup}>
              &times;
            </span>
          </div>
          <div className="popUp-body">
            <div className="profile">
              <img
                src={`https://evolutyzblobimages.blob.core.windows.net/unmaze/${subdata.employeeid}.jpg`}
                alt={`${subdata.employeeid}`}
              />
              <h5>
                <strong>
                  <i className="fa fa-address-card"></i>

                  {" " + subdata.employeeid}
                </strong>
              </h5>
            </div>
            <div className="infos">
              <ul className="personal-info">
                <li>
                  <div className="text">
                    <i className="fa fa-envelope"></i>
                    {"  " + subdata.emailid}
                  </div>
                </li>
                <li>
                  <div className="text">
                    <i className="fa fa-phone"></i>{" "}
                    {"   " + subdata.phonenumber}
                  </div>
                </li>
                <li>
                  <div className="text">
                    <i className="fa fa-mobile"></i>{" "}
                    {"  " + subdata.phonenumber}
                    (Alt)
                  </div>
                </li>
                <li>
                  <div className="text">
                    <i className="fa fa-archive"></i> {"  " + subdata.roomno}
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
      <div className="emp-grid">
        {listData.map((data) => (
          <div className="bordergrid">
            {data.map((subdata) => (
              <div className="grid">
                <div
                  className={
                    subdata.status === null
                      ? "profile-widget"
                      : parseInt(subdata.status) === 1
                      ? "profile-widget status bg-green"
                      : "profile-widget status bg-red"
                  }
                  onClick={() => {
                    myCard(subdata);
                  }}
                >
                  <div className="emp-img">
                    <img
                      src={`https://evolutyzblobimages.blob.core.windows.net/unmaze/${subdata.employeeid}.jpg`}
                      alt={`${subdata.employeeid}`}
                    />
                  </div>
                  <h4 className="emp-name">{subdata.firstname}</h4>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {showCard ? <Popup subdata={Popdta} /> : null}
    </>
  );
};

export default Listview;
