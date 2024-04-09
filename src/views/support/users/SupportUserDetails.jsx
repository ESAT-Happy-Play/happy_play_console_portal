import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import "./supportUserDetails.scss";
import { TextField } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { mockSupportUser } from "../../../helper/mocks";

export const SupportUserDetails = ({ handleGoBack }) => {
  const [showCurrentAddress, setShowCurrentAddress] = useState(false);
  const [isSamePresent, setIsSamePresent] = useState(false);

  const [supportUser, setSupportUser] = useState(mockSupportUser);

  const handleIsSamePresent = (e, value) => {
    setIsSamePresent(!value);
  };

  const toggleCurrentAddress = () => {
    setShowCurrentAddress((prev) => !prev);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className="user-header">
        <div className="user-header-details">
          <div className="user-photo">
            <img
              src="https://picsum.photos/id/237/200/300"
              alt="Photo of Support Name"
            />
          </div>
          <div className="user-info">
            <p className="user-name">
              {supportUser.firstName} {supportUser.lastName}
            </p>
            <p>{supportUser.mobileNumber}</p>
            <p className="user-status">
              Status{" "}
              {supportUser.isFullyVerified && (
                <span className="user-verified">Fully Verified</span>
              )}{" "}
              {supportUser.isActive && (
                <span className="user-active">Active</span>
              )}
            </p>
            <p>
              Last Activity{" "}
              <span className="user-active-time">
                {supportUser.lastActivity}
              </span>
            </p>
          </div>
        </div>
        <div className="user-report">
          <p>Report</p>
          <InfoIcon />
        </div>
      </div>
      <div className="user-more-details">
        <div className="user-personal-info">
          <p className="user-detail-heading">Personal Info</p>
          <div className="user-detail-field">
            <span style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}>
              First Name
            </span>
            <TextField
              fullWidth
              variant="outlined"
              defaultValue={supportUser.firstName}
              size="small"
            />
          </div>
          <div className="user-detail-field">
            <span style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}>
              Middle Name
            </span>
            <TextField
              fullWidth
              variant="outlined"
              defaultValue={supportUser.middleName}
              size="small"
            />
          </div>
          <div className="user-detail-field">
            <span style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}>
              Last Name
            </span>
            <TextField
              fullWidth
              variant="outlined"
              defaultValue={supportUser.lastName}
              size="small"
            />
          </div>
          <div className="user-detail-field">
            <span style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}>
              Birthday
            </span>
            <TextField
              fullWidth
              variant="outlined"
              defaultValue={supportUser.birthday}
              size="small"
            />
          </div>
          <div className="user-detail-field">
            <span style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}>
              Nationality
            </span>
            <TextField
              fullWidth
              variant="outlined"
              defaultValue={supportUser.nationality}
              size="small"
            />
          </div>
        </div>
        <div className="user-address">
          <p className="user-detail-heading">Address</p>
          <div className="user-detail-field">
            <span style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}>
              Place of Birth
            </span>
            <TextField
              fullWidth
              variant="outlined"
              defaultValue={supportUser.placeOfBirth}
              size="small"
            />
          </div>
          <div className="user-current-address" onClick={toggleCurrentAddress}>
            <span
              style={{
                margin: "18px 0px",
                fontWeight: "100",
                fontSize: "14px",
              }}
            >
              Current Address
            </span>
            <span
              style={{
                margin: "18px 0px",
                fontWeight: "100",
                fontSize: "14px",
              }}
            >
              {showCurrentAddress ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </span>
          </div>
          {showCurrentAddress && (
            <>
              <div className="user-address-line">
                <div className="user-detail-field">
                  <span
                    style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}
                  >
                    Region
                  </span>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue={supportUser.currentAddress.region}
                    size="small"
                  />
                </div>
                <div className="user-detail-field">
                  <span
                    style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}
                  >
                    Province
                  </span>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue={supportUser.currentAddress.province}
                    size="small"
                  />
                </div>
              </div>
              <div className="user-address-line">
                <div className="user-detail-field">
                  <span
                    style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}
                  >
                    Municipality
                  </span>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue={supportUser.currentAddress.municipality}
                    size="small"
                  />
                </div>
                <div className="user-detail-field">
                  <span
                    style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}
                  >
                    Barangay
                  </span>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue={supportUser.currentAddress.barangay}
                    size="small"
                  />
                </div>
              </div>
              <div className="user-detail-field">
                <span
                  style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}
                >
                  Street/Sitio
                </span>
                <TextField
                  fullWidth
                  variant="outlined"
                  defaultValue={supportUser.currentAddress.street}
                  size="small"
                />
              </div>
            </>
          )}
          <div style={{ marginLeft: "28px" }}>
            <FormControlLabel
              style={{ marginLeft: "-40px" }}
              control={
                <Checkbox
                  defaultValue={isSamePresent}
                  onChange={(e) => handleIsSamePresent(e, isSamePresent)}
                  checked={isSamePresent}
                />
              }
              label={
                <div style={{ fontSize: "12px" }}>
                  <span>Permanent Address same as Current Address.</span>
                </div>
              }
            />
          </div>
          <div className="user-permanent-address">
            <span
              style={{
                margin: "18px 0px",
                fontWeight: "100",
                fontSize: "14px",
              }}
            >
              Permanent Address
            </span>
          </div>
          {!isSamePresent && (
            <>
              <div className="user-address-line">
                <div className="user-detail-field">
                  <span
                    style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}
                  >
                    Region
                  </span>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue={supportUser.permanentAddress.region}
                    size="small"
                  />
                </div>
                <div className="user-detail-field">
                  <span
                    style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}
                  >
                    Province
                  </span>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue={supportUser.permanentAddress.province}
                    size="small"
                  />
                </div>
              </div>
              <div className="user-address-line">
                <div className="user-detail-field">
                  <span
                    style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}
                  >
                    Municipality
                  </span>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue={supportUser.permanentAddress.municipality}
                    size="small"
                  />
                </div>
                <div className="user-detail-field">
                  <span
                    style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}
                  >
                    Barangay
                  </span>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue={supportUser.permanentAddress.barangay}
                    size="small"
                  />
                </div>
              </div>
              <div className="user-detail-field">
                <span
                  style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}
                >
                  Street/Sitio
                </span>
                <TextField
                  fullWidth
                  variant="outlined"
                  defaultValue={supportUser.permanentAddress.street}
                  size="small"
                />
              </div>
            </>
          )}
          <div className="user-detail-field">
            <span style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}>
              Game Site
            </span>
            <TextField
              fullWidth
              variant="outlined"
              defaultValue={supportUser.gameSite}
              size="small"
            />
          </div>
        </div>
        <div className="user-proof">
          <p className="user-detail-heading">Proof</p>
          <div className="user-detail-field">
            <span style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}>
              Source of Income
            </span>
            <TextField
              fullWidth
              variant="outlined"
              defaultValue={supportUser.sourceOfIncome}
              size="small"
            />
          </div>
          <div className="user-detail-field">
            <span style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}>
              Nature of Work
            </span>
            <TextField
              fullWidth
              variant="outlined"
              defaultValue={supportUser.natureOfWork}
              size="small"
            />
          </div>
          <div className="user-detail-field">
            <span style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}>
              Type of ID
            </span>
            <TextField
              fullWidth
              variant="outlined"
              defaultValue={supportUser.typeOfID}
              size="small"
            />
          </div>
          <div className="user-detail-field">
            <span style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}>
              Front ID Picture
            </span>
            {supportUser.idPicture ? (
              <img src={supportUser.idPicture} alt="Front ID Picture" />
            ) : (
              <div className="user-id-placeholder"></div>
            )}
          </div>
          <div className="user-detail-field">
            <span style={{ margin: "0", fontWeight: "100", fontSize: "14px" }}>
              Selfie
            </span>
            {supportUser.selfiePicture ? (
              <img src={supportUser.selfiePicture} alt="Selfie Picture" />
            ) : (
              <div className="user-id-placeholder"></div>
            )}
          </div>
        </div>
      </div>
      <ArrowBackIcon className="back-icon" onClick={() => handleGoBack()} />
    </div>
  );
};
