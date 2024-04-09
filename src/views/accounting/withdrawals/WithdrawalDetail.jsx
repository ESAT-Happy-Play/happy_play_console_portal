import './withdrawalDetail.scss';
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
import { mockPaymentMethod, mockStatus } from '../../../helper/mocks';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';


const WithdrawalDetail = ({ isOpen, handleClose, handleSubmition, withdrawal }) => {
    const formWithdrawal = useForm({ defaultValues: withdrawal });
    const { register, handleSubmit, formState, reset } = formWithdrawal;
    const { errors } = formState;
    const [status, setStatus] = useState(withdrawal?.status ?? "");
    const [date, setDate] = useState(dayjs('2022-04-17'));
    const [paymentMethod, setPaymentMethod] = useState(withdrawal?.paymentMethod ?? "");

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
                    <p style={{ color: COLORS.violetMain, margin: 0 }}>Update Withdrawal</p>
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
                            <h2 className='field-header'>Display Name</h2>
                            <TextField
                                size="small"
                                placeholder="Enter your full name"
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
                        <Box>
                            <h2 className='field-header'>Amount</h2>
                            <TextField
                                size="small"
                                placeholder="Example Withdrawal"
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
                        <Box flex={1} width='250px'>
                            <h2 className='field-header'>Status</h2>
                            <FormControl fullWidth size="small">
                                <Select
                                    {
                                    ...register("status", { required: true })
                                    }
                                    displayEmpty
                                    onChange={(e) => { setStatus(e.target.value) }}
                                    value={status}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return (
                                                <p style={{ fontSize: "12px", color: "lightgray" }}>
                                                    Select Status
                                                </p>
                                            );
                                        }
                                        return mockStatus.find((e) => e.id == selected).name
                                    }}
                                >
                                    {mockStatus.map((status, index) => (
                                        <MenuItem value={status.id} key={status.id}>
                                            {status.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box flex={1} width='250px'>
                            <h2 className='field-header'>Payment Method</h2>
                            <FormControl fullWidth size="small">
                                <Select
                                    fullWidth
                                    {
                                    ...register("paymentMethod", { required: true })
                                    }
                                    displayEmpty
                                    onChange={(e) => { setPaymentMethod(e.target.value) }}
                                    value={paymentMethod}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return (
                                                <p style={{ fontSize: "12px", color: "lightgray" }}>
                                                    Select Payment Method
                                                </p>
                                            );
                                        }
                                        return mockPaymentMethod.find((e) => e.id == selected).name
                                    }}
                                >
                                    {mockPaymentMethod.map((paymentMethod, index) => (
                                        <MenuItem value={paymentMethod.id} key={paymentMethod.id}>
                                            {paymentMethod.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                        <Button onClick={handleClose} className="cancel-button"
                            sx={{ minWidth: 180, color: COLORS.violetMain }}>Close</Button>
                        <Button
                            variant='outlined'
                            type="submit"
                            className="add-button"
                            sx={{ minWidth: 180, color: COLORS.orange, borderColor: COLORS.orange }}
                        >Update Withdrawal <EditOutlinedIcon /></Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog >
    )
}

export default WithdrawalDetail;