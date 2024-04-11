import './supportReport.scss';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
import { mockReports } from '../../../helper/mocks';
import ReportDetail from './ReportDetail';
import ReportsTable from './ReportsTable';


const SupportReport = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleClose = () => {
        setOpenCreate(false);
    }

    const handleSubmit = (data) => {
        setOpenSuccess(true);
        handleClose();
    }

    return (
        <div className="home">
            <div className="header">
                <h1>Report an Issue</h1>
                <Button
                    onClick={() => setOpenCreate(true)}
                    size="small"
                    variant="outlined"
                    sx={{ margin: 0, height: 30 }}
                >New Report <AddIcon /></Button>
            </div>

            <ReportsTable data={mockReports} />

            {openCreate &&
                <ReportDetail
                    isOpen={openCreate}
                    handleSubmition={handleSubmit}
                    handleClose={handleClose}
                    isEditing={false}
                />}

            {openSuccess &&
                <Dialog
                    open={openSuccess}
                    onClose={() => setOpenSuccess(false)}
                >
                    <DialogTitle style={{ color: '#38A169', fontWeight: 'bold' }}>Success</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Successfully created report!</DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center" }}>
                        <Button onClick={() => setOpenSuccess(false)} className="cancel-button">Close</Button>
                    </DialogActions>
                </Dialog>
            }
        </div >

    )
}

export default SupportReport;