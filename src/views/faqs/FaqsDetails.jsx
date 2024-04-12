import "./faqsDetails.scss";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Close } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { COLORS } from "../../helper/colors";
import { ConfirmMessage } from "../../components/mui/modals";

const FaqsDetail = ({ isOpen, handleClose, faqs, isEditing }) => {
  const formFaqs = useForm({ defaultValues: faqs, mode: "all" });
  const { register, handleSubmit, setValue, formState } = formFaqs;
  const { errors } = formState;
  const [descriptionValue, setDescriptionValue] = useState();
  const [openConfirmSubmit, setConfirmSubmit] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
  });
  const [pageLoader, setPageLoader] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  const modules = {
    toolbar: [
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  useEffect(() => {
    if (faqs?.description !== undefined) {
      setDescriptionValue(faqs.description);
    }
  }, [faqs]);

  useEffect(() => {
    handleSubmitOpen();
  }, [updatedData]);

  useEffect(() => {
    register("description", { required: true });
  }, [register]);

  const handleSubmitOpen = () => {
    if (
      errors.title === undefined &&
      errors.description === undefined &&
      descriptionError === false &&
      updatedData?.title.length > 0
    ) {
      setConfirmSubmit(true);
    }
  };

  const handleSubmitClose = () => {
    setConfirmSubmit(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(true);
    handleClose();
  };

  const handleSubmitOkay = async () => {
    setShowSuccessModal(true);
    if (isEditing) {
      setSuccessMessage(`Update for ${updatedData.title} successfully added!`);
    } else {
      setSuccessMessage(
        `New FAQs for ${updatedData.title} successfully added!`
      );
    }

    handleSubmitClose();
  };

  const handleDescriptionChange = (content) => {
    setValue("description", content);
    setDescriptionValue(content);
    if (content.length === 0 || content === "<p><br></p>") {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  };

  const finalStepHandler = async (data) => {
    setUpdatedData(data);
    if (data.description.length === 0 || data.description === "<p><br></p>") {
      setDescriptionError(true);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <p style={{ color: COLORS.violetMain, margin: 0 }}>
              {isEditing ? "Update" : "Create"} FAQs
            </p>
            <Close onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap="10px"
            onSubmit={handleSubmit(finalStepHandler)}
          >
            <Box display="flex" gap="20px">
              <Box>
                <h2 className="field-header">Title</h2>
                <TextField
                  size="small"
                  placeholder="Example FAQs"
                  {...register("title", { required: true })}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    sx: {
                      fontSize: "14px",
                      "&.MuiOutlinedInput-notchedOutline": { fontSize: "14px" },
                    },
                  }}
                  error={!!errors.title}
                  errormessage={errors.title?.message}
                />
                {!!errors.title && (
                  <span
                    style={{
                      color: COLORS.redWarn,
                      marginLeft: "5px",
                      fontSize: "12px",
                    }}
                  >
                    Title must be filled.
                  </span>
                )}
              </Box>
            </Box>
            <Box>
              <h2 className="field-header">Description</h2>
              <ReactQuill
                className={
                  !!errors.description || descriptionError ? "ql-error" : null
                }
                theme={"snow"}
                onChange={handleDescriptionChange}
                value={descriptionValue}
                modules={modules}
                formats={formats}
                bounds={".app"}
                placeholder={"Description"}
              />
              {(!!errors.description || descriptionError) && (
                <span
                  style={{
                    color: COLORS.redWarn,
                    marginLeft: "5px",
                    fontSize: "12px",
                  }}
                >
                  Description must be filled.
                </span>
              )}
            </Box>
            <Box display="flex" justifyContent="space-evenly">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleClose}
                    className="cancel-button"
                    sx={{ width: 180, color: COLORS.violetMain }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="outlined"
                    type="submit"
                    className="add-button"
                    sx={{
                      width: 180,
                      color: COLORS.orange,
                      borderColor: COLORS.orange,
                    }}
                  >
                    Update FAQs <EditOutlinedIcon />
                  </Button>
                </>
              ) : (
                <Button
                  type="submit"
                  className="add-button"
                  sx={{
                    width: 180,
                    background: COLORS.violetMain,
                    color: "white",
                  }}
                >
                  Create FAQs <AddIcon />
                </Button>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <ConfirmMessage
        isOpenMessage={openConfirmSubmit}
        handleCloseMessage={handleSubmitClose}
        handleOkay={handleSubmitOkay}
        title={"Please Confirm"}
        content={`${
          isEditing
            ? `Are you sure you want to update
${updatedData.title}?`
            : "Are you sure you want to submit a new FAQ?"
        }`}
        color={"success"}
        isLoading={pageLoader}
      />
      <Dialog
        open={showSuccessModal}
        onClose={handleSubmitClose}
        sx={[{ ".MuiPaper-root": { borderRadius: 3 } }]}
      >
        <DialogTitle
          sx={{
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: 18,
            color: COLORS.green,
            borderBottom: `1px solid ${COLORS.background}`,
            paddingY: 1,
          }}
        >
          Success!
        </DialogTitle>
        <DialogContent sx={{ width: 300, paddingY: 0 }}>
          <p
            style={{
              margin: 0,
              paddingTop: 10,
              paddingBottom: 10,
              textAlign: "center",
            }}
          >
            {successMessage}
          </p>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", width: "100%" }}>
          <Button
            onClick={handleCloseSuccess}
            sx={{
              color: COLORS.violetMain,
              width: 250,
              background: COLORS.background,
              fontFamily: "Inter",
              marginBottom: "8px",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FaqsDetail;
