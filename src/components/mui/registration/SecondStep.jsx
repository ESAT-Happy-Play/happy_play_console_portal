import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { CurrentAddress, PermanentAddress, PermanentAddressInput } from "../index";
import { BranchService } from "../../../services";

import './step.scss';

export const SecondStep = ({
    btnBack,
    handleSubmit,
    formSubmit,
    register,
    errors,
    barangays,
    showPresAddr,
    showPerAddr,
    branchId,
    isrequired = false,
    resetAddr }) => {

    const [currentAddressData, setcurrentAddressData] = React.useState(null);
    const handleCurrentAddress = (obj) => {
        console.log(obj);
        setcurrentAddressData(obj)
    }

    const [currentAddressOpen, setcurrentAddressOpen] = React.useState(false);
    const handleCurrentAddressClick = () => {
        setcurrentAddressOpen(!currentAddressOpen);
    };

    const [permanentAddressOpen, setpermanentAddressOpen] = React.useState(false);
    const handlePermanentAddressClick = () => {
        setpermanentAddressOpen(!permanentAddressOpen);
        resetAddr(currentAddressData);
    };

    const [isSamePresent, setIsSamePresent] = React.useState(false);
    const handleIsSamePresent = (e, value) => {
        setIsSamePresent(!value);
        resetAddr(currentAddressData);
    }

    const [branchList, setbranchList] = React.useState(null);
    const handleGetBranchList = (obj) => {
        BranchService.getBranchByAddress(obj).then((resp) => {
            console.log("Get list of branches");
            if (resp) { setbranchList(resp.data) }
        });
    }

    useEffect(() => {
        setcurrentAddressOpen(showPresAddr);
        setpermanentAddressOpen(showPerAddr);
    }, [showPresAddr, showPerAddr]);

    return (
        <>
            <div className="body">
                <form onSubmit={handleSubmit(formSubmit)} noValidate>
                    <div className="form-input">
                        <div className="form-title">
                            <label>Place Of Birth</label>
                            <span className="required">*</span>
                        </div>
                        <TextField type="text" placeholder="Place Of Birth" size="small"
                            {...register("placeOfBirth", (isrequired) ? { required: true } : { required: false })}
                            error={!!errors.placeOfBirth}
                            fullWidth />
                    </div>

                    <div className='form-input'>
                        <List component="nav">
                            <ListItemButton onClick={handleCurrentAddressClick}>
                                <ListItemText primary="Current Address" />
                                <span style={{ color: 'red', marginRight: '150px', fontSize: '14px' }}>*</span>
                                {currentAddressOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={currentAddressOpen} timeout="auto">
                                <List component="div">
                                    <CurrentAddress
                                        register={register}
                                        errors={errors}
                                        handleAddressValue={handleGetBranchList}
                                        handleCurrentAddr={handleCurrentAddress} />
                                </List>
                            </Collapse>
                        </List>
                    </div>

                    <div style={{marginLeft:'28px'}}>
                        <FormControlLabel style={{ marginLeft: '-40px' }}
                            control={
                                <Checkbox defaultValue={isSamePresent} onChange={e => handleIsSamePresent(e, isSamePresent)} checked={isSamePresent} />
                            } label={
                                <div style={{ fontSize: '13px' }}><span>Permanent Address same as Current Address.</span></div>
                            } />
                    </div>

                    <div className='form-input'>
                        <List component="nav">
                            <ListItemButton onClick={handlePermanentAddressClick}>
                                <ListItemText primary="Permanent Address" />
                                <span style={{ color: 'red', marginRight: '130px', fontSize: '14px' }}>*</span>
                                {permanentAddressOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={permanentAddressOpen} timeout="auto">
                                <List component="div">
                                    {
                                        (currentAddressData !== null) ?
                                            (isSamePresent)
                                                ? <PermanentAddressInput
                                                    register={register}
                                                    errors={errors}
                                                    data={currentAddressData} />
                                                : <PermanentAddress
                                                    register={register}
                                                    errors={errors}/>
                                            : <PermanentAddress
                                                register={register}
                                                errors={errors}/>
                                    }

                                </List>
                            </Collapse>
                        </List>
                    </div>

                    {
                        (branchId === null)
                            ?
                            <div className="form-input">
                                <div className="form-title">
                                    <label>Game Site</label>
                                    <span className="required">*</span>
                                </div>
                                <TextField style={{ textAlign: 'left' }}
                                    variant="outlined" defaultValue="" size="small"
                                    {...register("branchId", (isrequired) ? { required: true } : { required: false })}
                                    error={!!errors.branchId}
                                    fullWidth select>
                                    <MenuItem value=""><em>Select game site</em></MenuItem>
                                    {
                                        (branchList !== null) ?
                                            branchList.map((item, index) => (
                                                <MenuItem key={item.branchId} value={item.branchId}>
                                                    {item.branchName} - {item.municipality}
                                                </MenuItem>
                                            ))
                                            : ""
                                    }
                                </TextField>
                            </div>
                            : ""
                    }
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