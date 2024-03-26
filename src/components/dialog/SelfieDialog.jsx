import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { COLORS } from '../../utils/common_helpers/colors';
import { Box } from '@mui/material';

import { MuiLoadingButton } from "../../components/mui";
import CheckIcon from '@mui/icons-material/Check';
import Selfie from '../mui/Selfie';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { ImageService } from '../../services'

const SelfieDialog = ({ isOpen, onClose, callBack }) => {

    const [submitLoading, setsubmitLoading] = React.useState(false);
    const [submitDisabled, setsubmitDisabled] = React.useState(true);
    const [imageVale, setimageVale] = React.useState(null);

    const handleTakeImage = (image) => {
        if (image === null) { setsubmitDisabled(true); }
        else { setsubmitDisabled(false); setimageVale(image); }
    }

    const handleUploadSelfie = () => {
        setsubmitLoading(true);
        ImageService.uploadBase64Image(imageVale).then((res) => {
            setsubmitLoading(false);
            callBack(res.data, imageVale);
            onClose();
        });
    }

    return (
    <>
      <Dialog disableEscapeKeyDown
            open={isOpen}
            sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}>
            <Box display="flex" justifyContent="space-between" color="#3b38a4">
                <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, paddingY: 1 }}>Take a Selfie</DialogTitle>
                <IconButton disabled={submitLoading} onClick={ onClose }>
                    <CloseIcon />
                </IconButton>
            </Box>
            
            <DialogContent
                sx={{ width: 300, padding:'10px 24px' }}>
                <Selfie imageCalback={handleTakeImage} />
            </DialogContent>
            <DialogActions sx={{ display:'block' }}>
                <MuiLoadingButton text="Save Image" variant="contained" disabled={submitDisabled}
                        loading={ submitLoading } size="medium" onClick={handleUploadSelfie}
                        sx={[{ background: COLORS.green, color: 'white', marginLeft:'15px' }, { '&:hover': { background: 'green' } }]}
                        loadingPosition='end'
                        icon={ <CheckIcon/> } />
            </DialogActions>
        </Dialog>
    </>
  )
}

export default SelfieDialog
