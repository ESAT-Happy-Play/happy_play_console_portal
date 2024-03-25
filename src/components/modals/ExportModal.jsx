import React from "react";
import "./exportModal.scss";

const ExportModal = ({ open, onClose, width, handleToCsv, handleToPdf }) => {
  return (
    <>
      {open && (
        <div className="modal-background" onClick={onClose}>
          <div
            className="export-modal-container"
            style={{ width: width }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="export-header">
              <p>Export</p>
            </div>
            <div className="export-body">
              <div onClick={handleToCsv}>
                <p>To csv</p>
              </div>
              <div onClick={handleToPdf}>
                <p>To pdf</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportModal;
