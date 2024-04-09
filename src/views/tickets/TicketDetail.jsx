import './ticketDetails.scss';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import { Close } from "@mui/icons-material";
import { Box, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { COLORS } from '../../helper/colors';
import { useForm } from 'react-hook-form';
import { mockDepartments, mockPriority, mockStatus, mockUsers } from '../../helper/mocks';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


const TicketDetail = ({ isOpen, handleClose, ticket, isEditing }) => {
    const formTicket = useForm({ defaultValues: ticket });
    const { register, handleSubmit, formState, reset } = formTicket;
    const { errors } = formState;
    const [status, setStatus] = useState(ticket?.status ?? "");
    const [priority, setPriority] = useState(ticket?.priority ?? "");
    const [department, setDepartment] = useState(ticket?.department ?? "");
    const [assignedTo, setAssignedTo] = useState(ticket?.assignedTo ?? "");
    const [file, setFile] = useState(null);

    const finalStepHandler = async (data) => {
        console.log(data);
    };

    function handleOnChange(e) {
        const target = e.target
        console.log(target.files[0], e)
        setFile(target.files[0]);
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <p style={{ color: COLORS.violetMain, margin: 0 }}>{isEditing ? "Update" : "Create"} Ticket</p>
                    <Close onClick={handleClose} sx={{ cursor: "pointer" }} />
                </Box></DialogTitle>
            <DialogContent>
                <Box
                    component='form'
                    display='flex'
                    flexDirection='column'
                    gap='10px'
                    onSubmit={handleSubmit(finalStepHandler)}
                >
                    <Box display='flex' gap='20px'>
                        <Box>
                            <h2 className='field-header'>Full Name</h2>
                            <TextField
                                size="small"
                                placeholder="Enter your full name"
                                {
                                ...register("fullName", { required: true })
                                }
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    sx: {
                                        fontSize: "14px",
                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "14px" },
                                    },
                                }}
                            />
                        </Box>
                        <Box>
                            <h2 className='field-header'>Ticket Title</h2>
                            <TextField
                                size="small"
                                placeholder="Example Ticket"
                                {
                                ...register("title", { required: true })
                                }
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    sx: {
                                        fontSize: "14px",
                                        "&.MuiOutlinedInput-notchedOutline": { fontSize: "14px" },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <h2 className='field-header'>Ticket Description</h2>
                        <TextField
                            multiline
                            rows={4}
                            placeholder="Placeholder"
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
                    <Box display='flex' gap='20px'>
                        <Box flex={1}>
                            <h2 className='field-header'>Status</h2>
                            <FormControl fullWidth size="small">
                                <Select
                                    fullWidth
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
                        <Box flex={1}>
                            <h2 className='field-header'>Priority Level</h2>
                            <FormControl fullWidth size="small">
                                <Select
                                    fullWidth
                                    {
                                    ...register("priority", { required: true })
                                    }
                                    displayEmpty
                                    onChange={(e) => { setPriority(e.target.value) }}
                                    value={priority}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return (
                                                <p style={{ fontSize: "12px", color: "lightgray" }}>
                                                    Select Priority Level
                                                </p>
                                            );
                                        }
                                        return mockPriority.find((e) => e.id == selected).name
                                    }}
                                >
                                    {mockPriority.map((priority, index) => (
                                        <MenuItem value={priority.id} key={priority.id}>
                                            {priority.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box display='flex' gap='20px'>
                        <Box flex={1}>
                            <h2 className='field-header'>Department</h2>
                            <FormControl fullWidth size="small">
                                <Select
                                    fullWidth
                                    {
                                    ...register("department", { required: true })
                                    }
                                    displayEmpty
                                    onChange={(e) => { setDepartment(e.target.value) }}
                                    value={department}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return (
                                                <p style={{ fontSize: "12px", color: "lightgray" }}>
                                                    Select Department
                                                </p>
                                            );
                                        }
                                        return mockDepartments.find((e) => e.id == selected).name
                                    }}
                                >
                                    {mockDepartments.map((department, index) => (
                                        <MenuItem value={department.id} key={department.id}>
                                            {department.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box flex={1}>
                            <h2 className='field-header'>Assigned To</h2>
                            <FormControl fullWidth size="small">
                                <Select
                                    fullWidth
                                    {
                                    ...register("assignedTo", { required: true })
                                    }
                                    displayEmpty
                                    onChange={(e) => { setAssignedTo(e.target.value) }}
                                    value={assignedTo}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return (
                                                <p style={{ fontSize: "12px", color: "lightgray" }}>
                                                    Select User
                                                </p>
                                            );
                                        }
                                        return mockUsers.find((e) => e.id == selected).name
                                    }}
                                >
                                    {mockUsers.map((user, index) => (
                                        <MenuItem value={user.id} key={user.id}>
                                            {user.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box>
                        <h2 className='field-header'>Insert Comment</h2>
                        <TextField
                            multiline
                            rows={4}
                            placeholder="Enter your comment here"
                            {
                            ...register("comment", "")
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
                                >Update Ticket <EditOutlinedIcon /></Button>
                            </>
                            :
                            <Button
                                type="submit"
                                className="add-button"
                                sx={{ width: 180, background: COLORS.violetMain, color: "white" }}
                            >Create Ticket <AddIcon /></Button>
                        }
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default TicketDetail