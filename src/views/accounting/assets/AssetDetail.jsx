import './assetDetail.scss';
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
import { assetTypes, mockPaymentMethod, mockStatus } from '../../../helper/mocks';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';


const AssetDetail = ({ isOpen, handleClose, handleSubmition, isEditing, asset }) => {
    const formAsset = useForm({ defaultValues: asset });
    const { register, handleSubmit, formState, reset } = formAsset;
    const { errors } = formState;
    const [type, setType] = useState(asset?.type ?? "");
    const [date, setDate] = useState(dayjs('2022-04-17'));

    const finalStepHandler = async (data) => {
        handleSubmition(data);
    };

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
                    <p style={{ color: COLORS.violetMain, margin: 0 }}>{isEditing ? "Update" : "Create"} Asset</p>
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
                            <h2 className='field-header'>Company</h2>
                            <TextField
                                size="small"
                                placeholder="Enter your Company Name"
                                {
                                ...register("name", { required: true })
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
                        <Box flex={1} width='250px'>
                            <h2 className='field-header'>Asset Type</h2>
                            <FormControl fullWidth size="small">
                                <Select
                                    {
                                    ...register("type", { required: true })
                                    }
                                    displayEmpty
                                    onChange={(e) => { setType(e.target.value) }}
                                    value={type}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return (
                                                <p style={{ fontSize: "12px", color: "lightgray" }}>
                                                    Select Asset Type
                                                </p>
                                            );
                                        }
                                        return assetTypes.find((e) => e.id == selected).name
                                    }}
                                >
                                    {assetTypes.map((type, index) => (
                                        <MenuItem value={type.id} key={type.id}>
                                            {type.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <h2 className='field-header'>Amount</h2>
                            <TextField
                                size="small"
                                placeholder="Input amount"
                                {
                                ...register("amount", { required: true })
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
                                >Update Asset <EditOutlinedIcon /></Button>
                            </>
                            :
                            <Button
                                type="submit"
                                className="add-button"
                                sx={{ width: 180, background: COLORS.violetMain, color: "white" }}
                            >Create Asset <AddIcon /></Button>
                        }
                    </Box>
                </Box>
            </DialogContent>
        </Dialog >
    )
}

export default AssetDetail;