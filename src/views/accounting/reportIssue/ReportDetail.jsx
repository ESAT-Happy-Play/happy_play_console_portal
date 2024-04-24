import './reportDetail.scss';
import React, { useMemo, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import { Close } from "@mui/icons-material";
import styled from '@emotion/styled';
import { Box, Button, TextField, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { COLORS } from '../../../helper/colors';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import { MuiLoadingButton } from '../../../components/mui';
import { DragDropTicketUpload } from '../../../components/mui/DragDropTicketUpload';

import { DateExt, StoreExt } from '../../../utils/helpers';
import { SupportService } from "../../../services";

const ReportDetail = ({ isOpen, handleClose, succesCallback, isEditing, report }) => {
    let authdata = StoreExt.getStore("auth");
    let tokenObj = StoreExt.getDecodeJWT(authdata.token);

    const [submitLoading, setsubmitLoading] = useState(false);
    const [isSubmitSuccess, setisSubmitSuccess] = useState(false);
    const [openAddConfirmation, setopenConfirmation] = useState(false);

    const formReport = useForm({ defaultValues: report });
    const { register, handleSubmit, formState, reset, control } = formReport;
    const { errors } = formState;
    const [formData, setFormData] = React.useState({});
    const [uploadList, setuploadList] = useState([]); 

    const [date, setDate] = useState(dayjs(report?.ticketDate));

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
                organizationId: null,
                ticketStatus: 1,
                companyId: tokenObj.companyId,
                branchId: authdata.branchId,
                priorityLevel: 0,
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
                organizationId: null,
                ticketStatus: 1,
                companyId: tokenObj.companyId,
                branchId: authdata.branchId,
                priorityLevel: 0,
                ticketDate: DateExt.formatDate(data.ticketDate),
                comment: null
            }

            setFormData(payload);
        }

        setopenConfirmation(true);
    };

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

    // const handleOnChange = (e) => {
    //     const target = e.target
    //     setFiles(target.files);
    // }

    // const handleDelete = (index) => {
    //     var dt = new DataTransfer()
    //     const input = document.getElementById('image');
    //     for (let i = 0; i < files.length; i++) {
    //         var file = files[i]
    //         if (index !== i)
    //             dt.items.add(file)
    //     }

    //     input.files = dt.files;
    //     setFiles(dt.files);
    // }

    // const fileAttachments = useMemo(() => {
    //     var attachments = [];
    //     for (let i = 0; i < files.length; i++) {
    //         attachments.push(
    //             <div className='detail-attachments'>
    //                 <AttachmentIcon sx={{ width: '18px', marginX: '8px' }} />
    //                 <p>{files[i].name}</p>
    //                 <DeleteOutlineIcon
    //                     onClick={() => handleDelete(i)}
    //                     sx={{ width: '18px', marginRight: '8px', marginLeft: 'auto' }}
    //                 />
    //             </div>
    //         )
    //     }
    //     return attachments;
    // }, [files]);

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


    const datePickerStyle = {
        width: '350px',
        'input': { paddingY: '0', height: '34px', fontSize: "14px" },
        'button': { background: COLORS.violetMain, borderRadius: '50px', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', color: 'white', paddingY: 0, paddingX: '15px', height: '34px' },
        '.MuiInputBase-root': { borderRadius: '50px', paddingRight: '13px' }
    };

    return (
        <>
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
                                <DragDropTicketUpload callBack={handleUploadImgCallback} 
                                removedCallback={handleRemovedCallback} 
                                oldAttachments={(report !== undefined) ? report.attachments : null} />
                            </Box>
                            <Box display='flex' flexDirection='column'>
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
                                    sx={[{ width: 180, background: COLORS.violetMain, color: "white" }, { '&:hover': { color: 'blue' } }]}
                                >Create Report <AddIcon /></Button>
                            }
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog >
        
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

export default ReportDetail;