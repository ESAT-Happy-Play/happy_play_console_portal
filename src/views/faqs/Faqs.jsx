import "./faqs.scss";
import React, { useState } from "react";
import { mockFAQs } from "../../helper/mocks";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import FaqsTable from "./FaqsTable";
import FaqsDetails from "./FaqsDetails";

const Faqs = () => {
  const [openCreate, setOpenCreate] = useState(false);

  const handleClose = () => {
    setOpenCreate(false);
  };

  return (
    <div className="home">
      <div className="header">
        <h1>FAQs</h1>
        <Button
          onClick={() => setOpenCreate(true)}
          size="small"
          variant="outlined"
          sx={{ margin: 0, height: 30 }}
        >
          New FAQs <AddIcon />
        </Button>
      </div>

      <FaqsTable data={mockFAQs} type={"Regular"} />

      {openCreate && (
        <FaqsDetails
          isOpen={openCreate}
          handleClose={handleClose}
          isEditing={false}
        />
      )}
    </div>
  );
};

export default Faqs;
