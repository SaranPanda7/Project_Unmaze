import React from "react";

const PopUp = (props) => {
  return (
    <div class="popUp">
      <div class="popUp-content">
        <div class="popUp-heading">
          <h2>{subdata.firstname}</h2>
          <span class="popDown" onClick={myPopup}>
            &times;
          </span>
        </div>
        <div class="popUp-body">
          <div class="profile">
            <img
              src={`https://evolutyzblobimages.blob.core.windows.net/unmaze/male.jpg`}
              alt={`${"subdata.employeeid"}`}
            />
            <h5>
              <small>Employee ID:</small>
              <strong>
                <i class="fa fa-address-card"></i>
                {"subdata.employeeid"}
              </strong>
            </h5>
          </div>
          <div class="infos">
            <ul class="personal-info">
              <li>
                <div class="title"></div>
                <div class="text">
                  <i class="fa fa-envelope"></i>
                </div>
              </li>
              <li>
                <div class="title">Relationship</div>
                <div class="text">
                  <i class="fa fa-phone"></i> {"subdata.phonenumber"}
                </div>
              </li>
              <li>
                <div class="title">Phone</div>
                <div class="text">
                  <i class="fa fa-mobile"></i> {"subdata.phonenumber"}
                  (Alt)
                </div>
              </li>
              <li>
                <div class="title">Phone</div>
                <div class="text">
                  <i class="fa fa-archive"></i> {"subdata.roomno"}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
