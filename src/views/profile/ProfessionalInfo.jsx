import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ContentLoader } from "../../components/mui";
import ImageIcon from '@mui/icons-material/Image';
import { DragDropProfileUpload, DragDropSelfieUpload } from "../../components/mui";
import { ConstArrayExt } from "../../utils/helpers";
import { UserService, ImageService } from "../../services";

function ProfessionalInfo({ dataObj }) {
    const [pageLoader, setPageLoader] = useState(false);
    const [frontImg, setfrontImg] = useState(null);
    const [selfieImg, setselfieImg] = useState(null);
    const [isEdit, setisEdit] = useState(false);

    const forProofInfo = useForm({
        defaultValues: {
            natureOfWork: "", sourceOfIncome: "", validIdType: "", 
            frontIdPath: "", selfiePath: ""
        }
    });
    const { register, handleSubmit, formState, reset } = forProofInfo;
    const { errors } = formState;

    const uploadIdView = (filePrev) => {
        setfrontImg(filePrev);
    }

    const uploadSelfieView = (filePrev) => {
        setselfieImg(filePrev);
    }

    const uploadIdImageCallback = (data, uploadType) => {
        reset(formValues => ({
            ...formValues, frontIdPath: data
        }));
    }

    const submitHandler = (data) => {
        setPageLoader(true);
        UserService.updateProofInfo(data).then((res) => {
            if (res) {
                dataObj["natureOfWork"] = data.natureOfWork;
                dataObj["sourceOfIncome"] = data.sourceOfIncome;
                dataObj["validId"] = data.validIdType;
                dataObj["frontIdPath"] = data.frontIdPath;
                dataObj["selfiePath"] = data.selfiePath;
            }
            setisEdit(false);
            setPageLoader(false);
        })
    }

    const uploadSelfieImageCallback = (data, uploadType) => {
        reset(formValues => ({
            ...formValues, selfiePath: data
        }));
    }

    const initImages = (fileName, intType = 0) => {
        ImageService.getImage(fileName).then((res) => {
            if(res.success) { 
               if(intType === 0) { setfrontImg(res.data); }
               if(intType === 1) { setselfieImg(res.data); } 
            }
        })
    }

    useEffect(() => {
        reset(formValues => ({
            ...formValues,
            natureOfWork: dataObj.natureOfWork, sourceOfIncome: dataObj.sourceOfIncome, validIdType: dataObj.validId,
            frontIdPath: (dataObj.frontIdPath !== null) ? dataObj.frontIdPath : "", 
            selfiePath: (dataObj.selfiePath !== null) ? dataObj.selfiePath : ""
        }));

        if(dataObj.frontIdPath !== null && dataObj.frontIdPath !== "") {
            initImages(dataObj.frontIdPath);
        }

        if(dataObj.selfiePath !== null && dataObj.selfiePath !== "") {
            initImages(dataObj.selfiePath, 1);
        }
    }, [dataObj]);

    return (
    <>
        {
            (isEdit) ?
            <div className='div-profile-conainer'>
                <div className='div-profilecontent'>
                    <form onSubmit={ handleSubmit(submitHandler) } noValidate>
                        <div className='profile-form-button'>
                            <Button onClick={e => setisEdit(false)} variant="text">Cancel</Button>
                            <Button type='submit' variant="text" color='success'>Done</Button>
                        </div>

                        <div>
                            <span style={{fontSize:'18px'}}>Work</span>
                        </div>

                        <div className='profile-form-input'>
                            <span className='spanFixW'>Source Of Income</span>
                            <TextField defaultValue={dataObj.sourceOfIncome} variant="outlined" size='small' fullWidth
                            {...register("sourceOfIncome", { required: true })}
                                error={!!errors.sourceOfIncome} select>
                                <MenuItem value=""><em>Select Source of Income</em></MenuItem>
                                {
                                    ConstArrayExt.getSourceOfIncomeList().map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </div>
                        <div className='profile-form-input'>
                            <span className='spanFixW'>Nature Of Work</span>
                            <TextField defaultValue={dataObj.natureOfWork} variant="outlined" size='small' fullWidth
                            {...register("natureOfWork", { required: true })}
                                error={!!errors.natureOfWork} select>
                                <MenuItem value=""><em>Select Source of Income</em></MenuItem>
                                {
                                    ConstArrayExt.getNatureOfWorkList().map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </div>
                        <br/>
                        <div>
                            <span style={{fontSize:'18px'}}>Proof Of Identity</span>
                        </div>
                        <div className='profile-form-input'>
                            <span className='spanFixW'>ID Type</span>
                            <TextField defaultValue={dataObj.validId} variant="outlined" size='small' fullWidth
                            {...register("validIdType", { required: true })}
                                error={!!errors.validIdType} select>
                                <MenuItem value=""><em>Select ID Type</em></MenuItem>
                                {
                                    ConstArrayExt.getIDTypes().map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </div>
                        <div className='profile-form-image'>
                            {
                                (frontImg !== null) ? <img className='img-display' src={ frontImg } alt="frontId" />
                                : <ImageIcon sx={{fontSize:'130px'}} />
                            }
                            <DragDropProfileUpload onView={uploadIdView} callBack={uploadIdImageCallback} />
                        </div>
                        <br/>
                        <div>
                            <span style={{fontSize:'18px'}}>Selfie</span>
                        </div>
                        <div className='profile-form-image'>
                            {
                                (selfieImg !== null) ? <img className='img-display' src={ selfieImg } alt="frontId" />
                                : <ImageIcon sx={{fontSize:'130px'}} />
                            }
                            <DragDropSelfieUpload onView={uploadSelfieView} callBack={uploadSelfieImageCallback} />
                        </div>
                    </form>
                </div>
            </div>
            :
            <div className='div-profile-conainer'>
                <div className='div-profilecontent'>
                    <div className='profile-form-button'>
                        <Button onClick={e => setisEdit(true)} variant="text">Edit</Button>
                    </div>

                    <div>
                        <span style={{fontSize:'18px'}}>Work</span>
                    </div>

                    <div className='profile-form-input'>
                        <span className='spanFixW'>Source Of Income</span>
                        <TextField defaultValue={dataObj.sourceOfIncome} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Nature Of Work</span>
                        <TextField defaultValue={dataObj.natureOfWork} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <br/>
                    <div>
                        <span style={{fontSize:'18px'}}>Proof Of Identity</span>
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>ID Type</span>
                        <TextField defaultValue={dataObj.validId} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-image'>
                        {
                            (frontImg !== null) ? <img className='img-display' src={ frontImg } alt="frontId" />
                            : <ImageIcon sx={{fontSize:'130px'}} />
                        }
                    </div>
                    <br/>
                    <div>
                        <span style={{fontSize:'18px'}}>Selfie</span>
                    </div>
                    <div className='profile-form-image'>
                        {
                            (selfieImg !== null) ? <img className='img-display' src={ selfieImg } alt="frontId" />
                            : <ImageIcon sx={{fontSize:'130px'}} />
                        }
                    </div>
                </div>
            </div>
        }

        <ContentLoader isLoadingPage={ pageLoader } />
    </>
    )
}

export default ProfessionalInfo
