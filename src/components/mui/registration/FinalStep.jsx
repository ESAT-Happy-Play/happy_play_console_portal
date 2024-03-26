import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button } from "@mui/material";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { ConstArrayExt } from "../../../utils/helpers";
import { DragDropUpload } from "../../../components/mui";

import './step.scss';

export const FinalStep = ({ btnBack, handleSubmit, formSubmit, register, errors, isrequired = false, reset }) => {

    const [frontIdOpen, setfrontIdOpen] = React.useState(false);
    const handleFrontIdClick = () => {
        setfrontIdOpen(!frontIdOpen);
    };

    const [selfieOpen, setselfieOpen] = React.useState(false);
    const handleSelfieClick = () => {
        setselfieOpen(!selfieOpen);
    };

    const handleUploadCallback = (data, uploadType) => {
        if (uploadType === 0) {
            reset(formValues => ({ ...formValues, frontIdPath: data }));
        }
        else {
            reset(formValues => ({ ...formValues, selfiePath: data }));
        }
    }

    return (
        <>
            <div className="body">
                <form onSubmit={handleSubmit(formSubmit)} noValidate>
                    <div className="form-input">
                        <div className="form-title">
                            <label>Source of Income</label>
                            <span className="required">*</span>
                        </div>
                        <TextField style={{ textAlign: 'left' }}
                            variant="outlined" defaultValue="" size="small"
                            {...register("sourceOfIncome", (isrequired) ? { required: true } : { required: false })}
                            error={!!errors.sourceOfIncome}
                            fullWidth select>
                            <MenuItem value=""><em>Select Source of Income</em></MenuItem>
                            {
                                ConstArrayExt.getSourceOfIncomeList().map((item, index) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </div>

                    <div className="form-input">
                        <div className="form-title">
                            <label>Nature Of Work</label>
                            <span className="required">*</span>
                        </div>
                        <TextField style={{ textAlign: 'left' }}
                            variant="outlined" defaultValue="" size="small"
                            {...register("natureOfWork", (isrequired) ? { required: true } : { required: false })}
                            error={!!errors.natureOfWork}
                            fullWidth select>
                            <MenuItem value=""><em>Select Nature of Work</em></MenuItem>
                            {
                                ConstArrayExt.getNatureOfWorkList().map((item, index) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </div>

                    <div className="form-input">
                        <div className="form-title">
                            <label>Type of ID</label>
                            <span className="required">*</span>
                        </div>
                        <TextField style={{ textAlign: 'left' }}
                            variant="outlined" defaultValue="" size="small"
                            {...register("validId", (isrequired) ? { required: true } : { required: false })}
                            error={!!errors.validId}
                            fullWidth select>
                            <MenuItem value=""><em>Select ID Type</em></MenuItem>
                            {
                                ConstArrayExt.getIDTypes().map((item, index) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </div>

                    <div className='form-input'>
                        <List component="nav">
                            <ListItemButton onClick={handleFrontIdClick}>
                                <ListItemText primary="Front ID Picture" />
                                <span style={{ color: 'red', marginRight: '140px', fontSize: '14px' }}>*</span>
                                {frontIdOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={frontIdOpen} timeout="auto">
                                <List component="div">
                                    <input type="hidden" {...register("frontIdPath", { required: false })} />
                                    <DragDropUpload callBack={handleUploadCallback} />
                                </List>
                            </Collapse>
                        </List>
                    </div>

                    <div className='form-input'>
                        <List component="nav">
                            <ListItemButton onClick={handleSelfieClick}>
                                <ListItemText primary="Selfie" />
                                <span style={{ color: 'red', marginRight: '230px', fontSize: '14px' }}>*</span>
                                {selfieOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={selfieOpen} timeout="auto">
                                <List component="div">
                                    <input type="hidden" {...register("selfiePath", { required: false })} />
                                    <DragDropUpload callBack={handleUploadCallback} uploadType={1} />
                                </List>
                            </Collapse>
                        </List>
                    </div>
                    <br />
                    <div className="form-button">
                        <Button onClick={btnBack} variant="outlined" fullWidth><KeyboardBackspaceOutlinedIcon /> Back</Button>
                        <Button type="submit" color="primary" variant="contained" fullWidth>
                            Next <ArrowRightAltOutlinedIcon />
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}