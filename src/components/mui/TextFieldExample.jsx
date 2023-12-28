import "./textfieldexample.scss"

import React from 'react'
import { useState } from 'react'
import { TextField, Typography, Stack, InputAdornment, IconButton } from "@mui/material"

import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

function TextFieldExample() {

  const [info, setInfo] = useState();
  const [eye, setEye] = useState(false);
  const handleEye = () => {
    setEye(!eye);
  }

  return (
    <div className="textField">
      <div className="textFieldContainer">
          <Typography variant='h4' align='center'>Text Field MUI Example</Typography>
          <Stack spacing={2} direction="row" m={2}>
            <TextField label="Enter name" variant="outlined" disabled/>
            <TextField label="Enter name" variant="filled"/>
            <TextField label="Enter name" variant="standard"/>
          </Stack>

          <Stack spacing={2} direction="row" m={2}>
            <TextField 
              label="Enter name" 
              variant="outlined" 
              size="small" 
              placeholder="Enter your name"
              InputProps={{readOnly:true}}
            />
            <TextField label="Enter name" variant="filled" color="secondary"/>
            <TextField label="Enter name" variant="standard"/>
          </Stack>

          <Stack spacing={2} direction="row" m={2}>
            <TextField 
              type="password"
              label="Enter password" 
              variant="outlined"
              value={info}
              onChange={e=>setInfo(e.target.value)}
              required
              helperText={!info ? "Password is required" : "Do not share your password to anyone" }
              error={!info}
            />

            <TextField 
              type="date" 
              variant="outlined"
            />

            <TextField 
              type="time" 
              variant="outlined"
            />
          </Stack>


          <Stack spacing={2} direction="row" m={2}>
            <TextField 
              type="number" 
              label="Enter salary"
              variant="outlined"
              InputProps={{
                startAdornment:<InputAdornment position="start">P</InputAdornment>
              }}
            />

            <TextField 
              type="number" 
              label="Age"
              variant="outlined"
              InputProps={{
                endAdornment:<InputAdornment position="end">Year</InputAdornment>
              }}
            />
          </Stack>

          <Stack spacing={2} direction="row" m={2}>
            <TextField 
              type={eye ? "text" : "password" }
              label="Enter password"
              variant="outlined"
              InputProps={{
                endAdornment:<InputAdornment position="end">
                  <IconButton onClick={ handleEye }>
                    {!eye ? <VisibilityIcon /> : <VisibilityOffIcon/> }
                  </IconButton>
                </InputAdornment>
              }}
            />
          </Stack>
      </div>
    </div>
  )
}

export default TextFieldExample
