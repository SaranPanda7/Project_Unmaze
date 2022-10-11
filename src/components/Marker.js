import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import xyz from "../images/profile-1.jpg";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  background-image: ${(props) =>
    props.empid
      ? `url(https://evolutyzblobimages.blob.core.windows.net/unmaze/${props.empid}.jpg)`
      : `url(https://evolutyzblobimages.blob.core.windows.net/unmaze/female.jpg)`};

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  &:hover {
    z-index: 1;
  }
`;

const Marker = ({ text, onClick, empid, dta }) => {
  const [show, setshow] = useState(false);

  useEffect(() => {}, [show]);

  const myPopup = () => {
    setshow(true);

    console.log("CLICK");
  };

  return (
    <Wrapper
      alt={text}
      empid={empid}
      onClick={() => {
        console.log(dta);
        setshow(false);
      }}
    >
      {show == true ? (
        <div class="popUp">
          <div class="popUp-content" style={{ width: 300 }}>
            <>
              <div class="popUp-heading">
                <h2>{dta.firstname}</h2>
                <span class="popDown" onClick={() => myPopup()}>
                  &times;
                </span>
              </div>
              <div class="popUp-body">
                <div class="profile">
                  <img
                    src={`https://evolutyzblobimages.blob.core.windows.net/unmaze/${dta.employeeid}.jpg`}
                    alt={`${dta.employeeid}`}
                  />
                  <h5>
                    {/* <small>Employee ID:</small> */}
                    <strong>
                      <i class="fa fa-address-card"></i>

                      {" " + dta.employeeid}
                    </strong>
                  </h5>
                </div>
                <div class="infos">
                  <ul class="personal-info">
                    <li>
                      {/* <div class="title"></div> */}
                      <div class="text">
                        <i class="fa fa-envelope"></i>
                        {"  " + dta.emailid}
                      </div>
                    </li>
                    <li>
                      {/* <div class="title">Relationship</div> */}
                      <div class="text">
                        <i class="fa fa-phone"></i> {"   " + dta.phonenumber}
                      </div>
                    </li>
                    <li>
                      {/* <div class="title">Phone</div> */}
                      <div class="text">
                        <i class="fa fa-mobile"></i> {"  " + dta.phonenumber}
                        (Alt)
                      </div>
                    </li>
                    <li>
                      {/* <div class="title">Phone</div> */}
                      <div class="text">
                        <i class="fa fa-archive"></i> {"  " + dta.roomno}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  empid: PropTypes.string,
};

export default Marker;
