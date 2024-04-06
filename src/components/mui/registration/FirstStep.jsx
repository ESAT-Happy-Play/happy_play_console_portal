import { TextField, MenuItem, Button  } from "@mui/material";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useState } from 'react'
import { ConstArrayExt } from "../../../utils/helpers";


export const FirstStep = ({btnBack, handleSubmit, formSubmit, register, errors}) => {
    
    const [message, setHelperText] = useState("");
    const [ageError,setAgeError] = useState("");

    const ageVerify = (value) => {
        let age = new Date().getFullYear() - new Date(value).getFullYear();
        if( age <= 21){
            setAgeError(true);
            setHelperText("Must be at least 21 years old");
        }
        setAgeError(false);
        setHelperText("");
    }

    const nextStep = (e) => {
        
        console.log();
    };


    return (
    <>
        <div className="body">
            <form onSubmit={handleSubmit(formSubmit)} onChange={nextStep}>
                <div className="form-input">
                    <div className="form-title">
                        <label>First Name</label>
                        <span className="required">*</span>
                    </div>
                    <TextField type="text" placeholder="First name" size="small"
                    {  ...register("firstName", { required: true } ) }
                    error={ !!errors.firstName }
                    helperText={ errors.firstName?.message }
                    fullWidth/>
                </div>

                <div className="form-input">
                    <div className="form-title">
                        <label>Middle Name</label>
                    </div>
                    <TextField type="text" placeholder="Middle name" size="small" 
                    {  ...register("middleName", { required: false } ) }
                    error={ !!errors.middleName }
                    helperText={ errors.middleName?.message }
                    fullWidth/>
                </div>

                <div className="form-input">
                    <div className="form-title">
                        <label>Last Name</label>
                        <span className="required">*</span>
                    </div>
                    <TextField type="text" placeholder="Last name" size="small" 
                    {  ...register("lastName", { required: true } ) }
                    error={ !!errors.lastName }
                    helperText={ errors.lastName?.message }
                    fullWidth/>
                </div>

                <div className="form-input">
                    <div className="form-title">
                        <label>Birthday</label>
                        <span className="required">*</span>
                    </div>
                    <TextField type="date" size="small" 
                    {  ...register("birthDate", { required: true} ) }
                    onChange={ageVerify}
                    error={ageError}
                    helperText={message}
                    fullWidth/>
                </div>

                <div className="form-input">
                    <div className="form-title">
                        <label>Nationality</label>
                        <span className="required">*</span>
                    </div>
                    <TextField style={{textAlign:'left'}}
                    variant="outlined" defaultValue="" size="small" 
                    {  ...register("nationality", { required: true } ) }
                    error={ !!errors.nationality }
                    helperText={ errors.nationality?.message }
                    fullWidth select>
                    <MenuItem value=""><em>Select nationality</em></MenuItem>
                        { 
                            ConstArrayExt.getNationalityList().map((item, index) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                            ))
                        }
                    </TextField>
                </div>
                
                {/* input hidden */}
                <input type="hidden" { ...register("placeOfBirth", { required: false } ) } />
                <input type="hidden" { ...register("presentRegion", { required: false } ) } />
                <input type="hidden" { ...register("presentProvince", { required: false } ) } />
                <input type="hidden" { ...register("presentMunicipality", { required: false } ) } />
                <input type="hidden" { ...register("presentBarangay", { required: false } ) } />
                <input type="hidden" { ...register("presentStreetOrPurok", { required: false } ) } />
                <input type="hidden" { ...register("permanentRegion", { required: false } ) } />
                <input type="hidden" { ...register("permanentProvince", { required: false } ) } />
                <input type="hidden" { ...register("permanentMunicipality", { required: false } ) } />
                <input type="hidden" { ...register("permanentBarangay", { required: false } ) } />
                <input type="hidden" { ...register("permanentStreetOrPurok", { required: false } ) } />
                <input type="hidden" { ...register("branchId", { required: false } ) } />

                <br/>
                <div className="form-button">
                    <Button onClick={btnBack} variant="outlined" fullWidth><KeyboardBackspaceOutlinedIcon /> Back</Button>
                    <Button id="firstStep" type="submit" color="primary" variant="contained" fullWidth>
                        Next <ArrowRightAltOutlinedIcon/>
                    </Button>
                </div>
            </form>
        </div>
    </>
  )
}