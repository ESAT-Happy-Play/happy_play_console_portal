import './reportDetail.scss';
import React, { useMemo, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import { Close } from "@mui/icons-material";
import { Box, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { COLORS } from '../../../helper/colors';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dropzone from 'react-dropzone';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const ReportDetail = ({ isOpen, handleClose, handleSubmission, isEditing, report }) => {
    const formReport = useForm({ defaultValues: report });
    const { register, handleSubmit, formState, reset, control } = formReport;
    const { errors } = formState;
    const [files, setFiles] = useState([]); //update this initialization, since im unsure of the format returned

    const finalStepHandler = async (data) => {
        handleSubmission(data);
    };

    const handleOnChange = (e) => {
        const target = e.target
        setFiles(target.files);
    }

    const handleDelete = (index) => {
        var dt = new DataTransfer()
        const input = document.getElementById('image');
        for (let i = 0; i < files.length; i++) {
            var file = files[i]
            if (index !== i)
                dt.items.add(file)
        }

        input.files = dt.files;
        setFiles(dt.files);
    }

    const fileAttachments = useMemo(() => {
        var attachments = [];
        for (let i = 0; i < files.length; i++) {
            attachments.push(
                <div className='detail-attachments'>
                    <AttachmentIcon sx={{ width: '18px', marginX: '8px' }} />
                    <p>{files[i].name}</p>
                    <DeleteOutlineIcon
                        onClick={() => handleDelete(i)}
                        sx={{ width: '18px', marginRight: '8px', marginLeft: 'auto' }}
                    />
                </div>
            )
        }
        return attachments;
    }, [files]);


    const datePickerStyle = {
        width: '350px',
        'input': { paddingY: '0', height: '34px', fontSize: "14px" },
        'button': { background: COLORS.violetMain, borderRadius: '50px', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', color: 'white', paddingY: 0, paddingX: '15px', height: '34px' },
        '.MuiInputBase-root': { borderRadius: '50px', paddingRight: '13px' }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <p style={{ color: COLORS.violetMain, margin: 0 }}>{isEditing ? "Update" : "Create"} Report</p>
                    <Close onClick={handleClose} sx={{ cursor: "pointer" }} />
                </Box></DialogTitle>
            <DialogContent>
                <Box
                    component='form'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    minWidth="500px"
                    gap='10px'
                    onSubmit={handleSubmit(finalStepHandler)}
                >
                    <Box display='flex' flexDirection='column' gap='10px'>
                        <Box display='flex' flexDirection='column'>
                            <h2 className='field-header'>Report Title</h2>
                            <TextField
                                size="small"
                                placeholder="Enter your Report Title"
                                {
                                ...register("title", { required: true })
                                }
                                error={!!errors.title}
                                variant="outlined"
                                InputProps={{
                                    sx: {
                                        width: "350px",
                                        fontSize: "14px",
                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "14px" },
                                    },
                                }}
                            />
                            {!!errors.title && (
                                <span
                                    style={{
                                        color: COLORS.redWarn,
                                        marginLeft: "5px",
                                        fontSize: "12px",
                                    }}
                                >
                                    Report Title must be filled
                                </span>
                            )}
                        </Box>
                        <Box display='flex' flexDirection='column'>
                            <h2 className='field-header'>Report Description</h2>
                            <TextField
                                multiline
                                rows={4}
                                placeholder="Enter your description"
                                {
                                ...register("description", { required: true })
                                }
                                error={!!errors.description}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    sx: {
                                        fontSize: "14px",
                                        padding: '5px 10px',
                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "15px" },
                                    },
                                }}
                            />
                            {!!errors.description && (
                                <span
                                    style={{
                                        color: COLORS.redWarn,
                                        marginLeft: "5px",
                                        fontSize: "12px",
                                    }}
                                >
                                    Report Description must be filled
                                </span>
                            )}
                        </Box>
                        <Box flex={1} display="flex" flexDirection="column">
                            <h2 className='field-header'>Attachment</h2>
                            {fileAttachments}
                            <Dropzone onDrop={acceptedFiles => setFiles(acceptedFiles)}>
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} id="image" type="file" name="image"
                                                onChange={handleOnChange}
                                                accept="image/png, image/jpg"
                                                multiple />
                                            <div className='dropbox-area'>
                                                <FileUploadOutlinedIcon />
                                                <p>Drop here to attach or upload</p>
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </Box>
                        <Box display='flex' flexDirection='column'>
                            <h2 className='field-header'>Date</h2>
                            <Controller
                                control={control}
                                name='date'
                                rules={{ required: true, valueAsDate: true }}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ height: '50px', borderRadius: '50px' }}>
                                        <DatePicker
                                            value={field}
                                            onChange={field.onChange}
                                            sx={datePickerStyle}
                                            error={!!errors.date}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                            {!!errors.date && (
                                <span
                                    style={{
                                        color: COLORS.redWarn,
                                        marginLeft: "5px",
                                        fontSize: "12px",
                                    }}
                                >
                                    Select Date
                                </span>
                            )}
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-evenly">
                        {isEditing ?
                            <>
                                <Button onClick={handleClose} className="cancel-button"
                                    sx={{ width: 180, color: COLORS.violetMain }}>Close</Button>
                                <Button
                                    variant='outlined'
                                    type="submit"
                                    className="add-button"
                                    sx={{ width: 180, color: COLORS.orange, borderColor: COLORS.orange }}
                                >Update Report <EditOutlinedIcon /></Button>
                            </>
                            :
                            <Button
                                type="submit"
                                className="add-button"
                                sx={{ width: 180, background: COLORS.violetMain, color: "white" }}
                            >Create Report <AddIcon /></Button>
                        }
                    </Box>
                </Box>
            </DialogContent>
        </Dialog >
    )
}

export default ReportDetail;