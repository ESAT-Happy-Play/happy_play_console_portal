import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingButton } from "@mui/lab";
import { COLORS } from "../../../helper/colors";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

export const ConfirmMessage = ({
  isOpenMessage,
  handleCloseMessage,
  handleOkay,
  title,
  content,
  color,
  isLoading,
}) => {
  return (
    <>
      <Dialog open={isOpenMessage} disableEscapeKeyDown>
        <DialogTitle
          sx={{
            color: COLORS.skyBlue,
            fontFamily: "Inter",
            fontWeight: "bold",
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <LoadingButton
            loading={isLoading}
            onClick={handleCloseMessage}
            sx={{
              fontFamily: "Inter",
              fontWeight: "bold",
              backgroundColor: COLORS.tableBackground,
              color: COLORS.violetMain,
              width: "50%",
              borderRadius: "10px",
            }}
          >
            Close
          </LoadingButton>
          <LoadingButton
            loading={isLoading}
            onClick={handleOkay}
            autoFocus
            sx={{
              fontFamily: "Inter",
              fontWeight: "bold",
              backgroundColor: COLORS.violetMain,
              color: "white",
              width: "50%",
              borderRadius: "10px",
              "&:hover": {
                color: "white",
                backgroundColor: COLORS.violetMain,
              },
            }}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
