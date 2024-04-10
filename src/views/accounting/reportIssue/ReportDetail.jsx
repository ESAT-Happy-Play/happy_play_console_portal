import './reportDetail.scss';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import { Close } from "@mui/icons-material";
import { Box, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { COLORS } from '../../../helper/colors';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';


const ReportDetail = ({ isOpen, handleClose, handleSubmition, isEditing, report }) => {
    const formReport = useForm({ defaultValues: report });
    const { register, handleSubmit, formState, reset } = formReport;
    const { errors } = formState;
    const [date, setDate] = useState(dayjs('2022-04-17'));
    const [file, setFile] = useState(null);

    const finalStepHandler = async (data) => {
        handleSubmition(data);
    };

    function handleOnChange(e) {
        const target = e.target
        console.log(target.files[0], e)
        setFile(target.files[0]);
    }


    const datePickerStyle = {
        width: '250px',
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
                    minWidth="400px"
                    gap='10px'
                    onSubmit={handleSubmit(finalStepHandler)}
                >
                    <Box display='flex' flexDirection='column' gap='10px'>
                        <Box>
                            <h2 className='field-header'>Report Title</h2>
                            <TextField
                                size="small"
                                placeholder="Enter your Report Title"
                                {
                                ...register("title", { required: true })
                                }
                                variant="outlined"
                                InputProps={{
                                    sx: {
                                        width: "250px",
                                        fontSize: "14px",
                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "14px" },
                                    },
                                }}
                            />
                        </Box>
                        <Box>
                            <h2 className='field-header'>Report Description</h2>
                            <TextField
                                multiline
                                rows={4}
                                placeholder="Enter your description"
                                {
                                ...register("description", "")
                                }
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
                        </Box>

                        <input id="image" type="file" name="image"
                            onChange={handleOnChange}
                            accept="image/png, image/jpg"
                        />
                        <Box>
                            <h2 className='field-header'>Date</h2>
                            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ height: '50px', borderRadius: '50px' }}>
                                <DatePicker
                                    value={date}
                                    onChange={(newDate) => setDate(newDate)}
                                    sx={datePickerStyle}
                                    {
                                    ...register("date", { required: true })
                                    }
                                />
                            </LocalizationProvider>
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