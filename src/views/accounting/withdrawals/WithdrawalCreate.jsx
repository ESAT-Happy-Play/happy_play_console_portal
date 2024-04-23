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
import { useForm, Controller } from 'react-hook-form';
import { mockPaymentMethod, mockStatus } from '../../../helper/mocks';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomTab from '../../../components/tab/CustomTab';
import RegularSearchBar from '../../../components/searchbar/RegularSearchBar';


const WithdrawalCreate = ({ isOpen, handleClose, withdrawals, handleSubmission }) => {
    const formWithdrawals = useForm({ defaultValues: withdrawals });
    const { register, handleSubmit, formState, reset, control } = formWithdrawals;
    const { errors } = formState;
    const [status, setStatus] = useState(withdrawals?.status ?? "");
    const [paymentMethod, setPaymentMethod] = useState(withdrawals?.paymentMethod ?? "");

    const finalStepHandler = async (data) => {
        handleSubmission(data);
    };

    const handleSearch = (event, value) => {
        console.log(value);
    };

    const datePickerStyle = {
        width: '250px',
        'input': { paddingY: '0', height: '34px', fontSize: "12px" },
        'button': { background: COLORS.violetMain, borderRadius: '50px', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', color: 'white', paddingY: 0, paddingX: '15px', height: '34px' },
        '.MuiInputBase-root': { borderRadius: '50px', paddingRight: '13px' }
    };

    const tabs = [
        {
            label: 'Create Withdrawals',
            Component:
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
                        <Box display='flex' flexDirection='column'>
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
                                error={!!errors.name}
                            />
                            {!!errors.name && (
                                <span
                                    style={{
                                        color: COLORS.redWarn,
                                        marginLeft: "5px",
                                        fontSize: "12px",
                                    }}
                                >
                                    Display Name must be filled
                                </span>
                            )}
                        </Box>
                        <Box display='flex' flexDirection='column'>
                            <h2 className='field-header'>Amount</h2>
                            <TextField
                                type='number'
                                size="small"
                                placeholder="Place amount"
                                {
                                ...register("amount", { required: true, min: 1 })
                                }
                                variant="outlined"
                                InputProps={{
                                    sx: {
                                        width: "250px",
                                        fontSize: "14px",
                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "14px" },
                                    },
                                }}
                                error={!!errors.amount}
                            />
                            {!!errors.amount && (
                                <span
                                    style={{
                                        color: COLORS.redWarn,
                                        marginLeft: "5px",
                                        fontSize: "12px",
                                    }}
                                >
                                    {errors.amount?.type == "required" ? "Amount is required" : "Amount must be greater than 0"}
                                </span>
                            )}
                        </Box>
                        <Box flex={1} width='250px' display='flex' flexDirection='column'>
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
                                    error={!!errors.status}
                                >
                                    {mockStatus.map((status, index) => (
                                        <MenuItem value={status.id} key={status.id}>
                                            {status.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {!!errors.status && (
                                <span
                                    style={{
                                        color: COLORS.redWarn,
                                        marginLeft: "5px",
                                        fontSize: "12px",
                                    }}
                                >
                                    Select Status
                                </span>
                            )}
                        </Box>
                        <Box flex={1} width='250px' display='flex' flexDirection='column'>
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
                                    error={!!errors.paymentMethod}
                                >
                                    {mockPaymentMethod.map((paymentMethod, index) => (
                                        <MenuItem value={paymentMethod.id} key={paymentMethod.id}>
                                            {paymentMethod.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {!!errors.paymentMethod && (
                                <span
                                    style={{
                                        color: COLORS.redWarn,
                                        marginLeft: "5px",
                                        fontSize: "12px",
                                    }}
                                >
                                    Select Payment Method
                                </span>
                            )}
                        </Box>

                        <Box display='flex' flexDirection='column'>
                            <h2 className='field-header'>Date</h2>
                            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ height: '50px', borderRadius: '50px' }}>
                                <Controller
                                    control={control}
                                    {
                                    ...register("date", { required: true })
                                    }
                                    render={({ field }) => (
                                        <DatePicker
                                            displayEmpty
                                            sx={datePickerStyle}
                                            onChange={field.onChange}
                                            slotProps={{
                                                textField: {
                                                    variant: 'outlined',
                                                    error: !!errors.date,
                                                },
                                            }}

                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            {!!errors.paymentMethod && (
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

                        <Button
                            type="submit"
                            className="add-button"
                            sx={{ minWidth: 180, background: COLORS.violetMain, color: "white" }}
                        >Create Withdrawals <AddIcon /></Button>
                    </Box>
                </Box>
        },
        {
            label: 'Lookup Reference',
            Component: <Box display='flex' flexDirection='column' alignItems='center' gap='15px'>
                <Box>
                    <h2 className='field-header'>Display Name</h2>
                    <RegularSearchBar
                        handleSearch={handleSearch}
                        searchTitle="Search Reference Number"
                    />
                </Box>

                <Button
                    type="submit"
                    className="add-button"
                    sx={{ minWidth: 180, background: COLORS.violetMain, color: "white" }}
                >Search <AddIcon /></Button>
            </Box >
        }
    ]

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <DialogTitle>
                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <p style={{ color: COLORS.violetMain, margin: 0 }}> Create Withdrawals</p>
                        <Close onClick={handleClose} sx={{ cursor: "pointer" }} />
                    </Box></DialogTitle>
                <DialogContent>
                    <CustomTab
                        tabList={tabs}
                    />

                </DialogContent>
            </Dialog >
        </>
    )
}

export default WithdrawalCreate;