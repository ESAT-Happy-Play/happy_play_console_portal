import './ticketDetails.scss';
import React, { useMemo, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import { Close } from "@mui/icons-material";
import { Box, Button, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { COLORS } from '../../helper/colors';
import { useForm } from 'react-hook-form';
import { mockDepartments, mockPriority, mockStatus, mockUsers } from '../../helper/mocks';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import { MuiLoadingButton } from '../../components/mui';
import { DragDropTicketUpload } from '../../components/mui/DragDropTicketUpload';
import { StoreExt, DateExt } from "../../utils/helpers";
import { SupportService } from "../../services";

const TicketDetail = ({ isOpen, handleClose, succesCallback, caseStatuses, caseOrganizations, ticket, isEditing }) => {
    let authdata = StoreExt.getStore("auth");
    let tokenObj = StoreExt.getDecodeJWT(authdata.token);

    const formTicket = useForm({ defaultValues: ticket });
    const { register, handleSubmit, formState, reset } = formTicket;
    const { errors } = formState;
    const [formData, setFormData] = React.useState({});

    const [submitLoading, setsubmitLoading] = useState(false);
    const [isSubmitSuccess, setisSubmitSuccess] = useState(false);
    const [openAddConfirmation, setopenConfirmation] = useState(false);

    const [status, setStatus] = useState(ticket?.statusId ?? "");
    const [priority, setPriority] = useState(ticket?.importance ?? "");
    const [department, setDepartment] = useState(ticket?.organizationId ?? "");
    const [assignedTo, setAssignedTo] = useState(ticket?.reportedPerson ?? "");
    const [uploadList, setuploadList] = useState([]);
    
    const [date, setDate] = useState(dayjs(ticket?.ticketDate)); //update this initialization, since im unsure of the date format returned

    const datePickerStyle = {
        flex: 1,
        'input': { paddingY: '0', height: '34px', fontSize: "14px" },
        'button': { background: COLORS.violetMain, borderRadius: '50px', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', color: 'white', paddingY: 0, paddingX: '15px', height: '34px' },
        '.MuiInputBase-root': { borderRadius: '50px', paddingRight: '13px' }
    };

    const finalStepHandler = async (data) => {
        let attachmentList = [];
        for (let i = 0; i < uploadList.length; i++) {
            attachmentList.push({
                fileName: `${uploadList[i].fileName}|${uploadList[i].apiresponse}`, 
                content: null, fileType: null
            });
        }

        if (!isEditing) {
            let payload = {
                title: data.title, description: data.description,
                owner: {
                    userId: authdata.id, mobileNumber: "", firstName: authdata.fullname.split(" ")[0], 
                    lastName: authdata.fullname.split(" ")[1], middleName: "", email: ""
                }, attachments: attachmentList,
                assignTo: null,
                categoryId: null,
                organizationId: data.organizationId,
                ticketStatus: data.statusId,
                companyId: tokenObj.companyId,
                branchId: authdata.branchId,
                priorityLevel: data.importance,
                ticketDate: DateExt.formatDate(data.ticketDate),
                comment: null
            }

            setFormData(payload);
        } else {
            //edit payload
            let payload = {
                caseId: data.caseId,
                title: data.title, description: data.description,
                who: {
                    userId: authdata.id, mobileNumber: "", firstName: authdata.fullname.split(" ")[0], 
                    lastName: authdata.fullname.split(" ")[1], middleName: "", email: ""
                },
                attachments: attachmentList,
                assignTo: null,
                categoryId: null,
                organizationId: data.organizationId,
                ticketStatus: data.statusId,
                companyId: tokenObj.companyId,
                branchId: authdata.branchId,
                priorityLevel: data.importance,
                ticketDate: DateExt.formatDate(data.ticketDate),
                comment: data.comment
            }

            setFormData(payload);
        }

        setopenConfirmation(true);
    };

    const handleUploadImgCallback = (objList) => {
        let upList = uploadList;
        for (let i = 0; i < objList.length; i++) {
            upList.push(objList[i]);
        }
        setuploadList(upList);
    }

    const handleRemovedCallback = (fileName) => {
        let filteredList = uploadList.filter(obj => obj.fileName !== fileName);
        setuploadList(filteredList);
    }

    const handleConfirm = () => {
        setsubmitLoading(true);

        if (isEditing) {
            SupportService.updateTicketOwner(formData).then((resp) => {
                if (resp) { setisSubmitSuccess(true); }
                setsubmitLoading(false);
            });
        } else {
            SupportService.createTicket(formData).then((resp) => {
                if (resp) { setisSubmitSuccess(true); }
                setsubmitLoading(false);
            });
        }
    }

    const handleSuccessClose = () => {
        setopenConfirmation(false);
        succesCallback();
        // onClose(false);
        // window.location.reload(false);
    }

    return (
        <>
            <Dialog
                open={isOpen}
                // onClose={handleClose}
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

                            {
                                (isEditing) ? <Box>
                                    <h2 className='field-header'>Full Name</h2>
                                    <TextField
                                        size="small"
                                        placeholder="Enter your full name"
                                        disabled
                                        variant="outlined"
                                        value={ticket?.fullname}
                                        fullWidth
                                        InputProps={{
                                            sx: {
                                                fontSize: "14px",
                                                "&.MuiOutlinedInput-notchedOutline": { fontSize: "14px" },
                                            },
                                        }}
                                    />
                                </Box> : <></>
                            }
                            
                            <Box style={{flex: 1 }}>
                                <h2 className='field-header'>Ticket Title</h2>
                                <TextField
                                    size="small"
                                    placeholder="Enter Title"
                                    {
                                    ...register("title", { required: true })
                                    }
                                    error={ !!errors.title }
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
                                ...register("description", { required: true })
                                }
                                error={ !!errors.description }
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
                        <Box flex={1} display="flex" flexDirection="column">
                            <DragDropTicketUpload callBack={handleUploadImgCallback} 
                            removedCallback={handleRemovedCallback} 
                            oldAttachments={(ticket !== undefined) ? ticket.attachments : null} />
                        </Box>
                        <Box flex={1} display="flex" flexDirection="column">
                            <h2 className='field-header'>Date</h2>
                            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ height: '50px', borderRadius: '50px' }}>
                                <DatePicker
                                    value={date}
                                    onChange={(newDate) => setDate(newDate)}
                                    sx={datePickerStyle}
                                    {
                                    ...register("ticketDate", { required: true })
                                    }
                                    error={ !!errors.ticketDate }
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box display='flex' gap='20px'>
                            <Box flex={1}>
                                <h2 className='field-header'>Status</h2>
                                <FormControl fullWidth size="small">
                                    <Select
                                        fullWidth
                                        {
                                        ...register("statusId", { required: true })
                                        }
                                        error={ !!errors.statusId }
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
                                            return caseStatuses.find((e) => e.caseStatusId == selected).name
                                        }}
                                    >
                                        {caseStatuses.map((status, index) => (
                                            <MenuItem value={status.caseStatusId} key={status.caseStatusId}>
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
                                        ...register("importance", { required: true })
                                        }
                                        error={ !!errors.importance }
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
                                        ...register("organizationId", { required: true })
                                        }
                                        error={ !!errors.organizationId }
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
                                            return caseOrganizations.find((e) => e.organizationId == selected).name
                                        }}
                                    >
                                        {caseOrganizations.map((department, index) => (
                                            <MenuItem value={department.organizationId} key={department.organizationId}>
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
                                        ...register("reportedPersonId", { required: false })
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
                        
                        {
                            (isEditing) ?
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
                            : <></>
                        }
                        <br/>
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
                                    sx={[{ width: 180, background: COLORS.violetMain, color: "white" }, { '&:hover': { color: 'blue' } }]}
                                >Create Ticket <AddIcon /></Button>
                            }
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* confirm */}
            <Dialog disableEscapeKeyDown
                open={openAddConfirmation}
                sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
            >
                <Box display="flex" justifyContent="space-between" color="#3b38a4" borderBottom='1px solid #787878'>
                    {
                        (!isSubmitSuccess) ? <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, paddingY: 1 }}>Please Confirm</DialogTitle>
                        : <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, paddingY: 1, color:'green' }}>Success!</DialogTitle>
                    }
                    
                    {
                        (!isSubmitSuccess) ? 
                            <IconButton disabled={submitLoading} onClick={e => setopenConfirmation(false)}>
                                <CloseIcon />
                            </IconButton>
                        : <></>
                    }
                    
                </Box>
                
                {
                    (isEditing) ?
                    <DialogContent
                        sx={{ width: 300 }}>
                            {
                                (!isSubmitSuccess) ? <div style={{display:'grid',textAlign:'center'}}>
                                    <span>Are you sure you want to update [{formData.title}]?</span>
                                </div>
                                : <div style={{display:'grid',textAlign:'center'}}>
                                    <span>[{formData.title}] updated successfully!</span>
                                </div>
                            }
                    </DialogContent>
                    :
                    <DialogContent
                        sx={{ width: 300 }}>
                            {
                                (!isSubmitSuccess) ? <div style={{display:'grid',textAlign:'center'}}>
                                    <span>Are you sure you want to submit a new report?</span>
                                </div>
                                : <div style={{display:'grid',textAlign:'center'}}>
                                    <span>New report for [{formData.title}] successfully added!</span>
                                </div>
                            }
                    </DialogContent>
                }

                <DialogActions sx={{ justifyContent: "center" }}>
                    {
                        (!isSubmitSuccess) ?
                        <>
                            <StyledButton disabled={submitLoading} onClick={e => setopenConfirmation(false)}>Close</StyledButton>
                    
                            <MuiLoadingButton text="Confirm" variant="contained" onClick={handleConfirm} 
                            loading={ submitLoading } size="medium"
                            sx={[{ background: COLORS.green, color: 'white' }, { '&:hover': { background: 'green' } }]}
                            loadingPosition='end'
                            icon={ <CheckIcon/> } />
                        </> 
                        : <>
                            <StyledButton sx={{width:'100%'}} onClick={handleSuccessClose}>Close</StyledButton>
                        </>
                    } 
                </DialogActions>
            </Dialog>
        </>
    )
}

const StyledButton = styled(Button)(`
    font-family: 'Inter';
    width: 128px;
    `,
);

export default TicketDetail