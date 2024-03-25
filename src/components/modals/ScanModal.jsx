import React from "react";
import "./scanModal.scss";
import { Close } from "@mui/icons-material";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import UploadIcon from "@mui/icons-material/Upload";

const ScanModal = ({ open, onClose, width, handleScan, handleUpload }) => {
  return (
    <>
      {open && (
        <div className="modal-background">
          <div
            className="scan-modal-container"
            style={{ width: width }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="scan-header">
              <p>Scan</p>
              <Close onClick={onClose} sx={{ cursor: "pointer" }} />
            </div>
            <div className="scan-body">
              <div className="scan-item" onClick={handleScan}>
                <CropFreeOutlinedIcon />
                <p>Scan Now</p>
              </div>
              <div className="scan-item" onClick={handleUpload}>
                <UploadIcon />
                <p>Upload from Computer</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScanModal;
