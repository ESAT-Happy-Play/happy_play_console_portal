import TextField from '@mui/material/TextField';

import "./mui.scss";

export const MuiInputFlex = ({ 
  register, 
  error, 
  errorMsg,
  title,
  name, 
  label, 
  type, 
  placeholder, 
  validation, 
  variant = 'outlined', 
  size = 'small', 
  multiline = false, 
  fullWidth = true, 
  required = false, 
  className,
  inputProps,
  onchange,
  focused = false }) => {
  return (
    <div className='inputFlex'>
        <div className='div-fchild'>
            <span>{title}</span>
        </div>
        <div className='div-lchild'>
            <TextField
            onChange={onchange}
            className={className}
            focused={focused}
            type={type}
            label={label} 
            placeholder={placeholder}
            required={required}
            { ...register(name, validation) }
            error={ error }
            helperText={ errorMsg }
            variant={variant}
            multiline={multiline}
            size={size}
            fullWidth={fullWidth}
            InputProps={inputProps} />
        </div>
    </div>
  )
}