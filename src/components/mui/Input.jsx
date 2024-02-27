import TextField from '@mui/material/TextField';

export const MuiInput = ({ 
  register, 
  isError, 
  errorMsg, 
  name, 
  label, 
  type, 
  placeholder, 
  validation, 
  variant, 
  size, 
  multiline = false, 
  fullWidth = true, 
  required = false, 
  className,
  inputProps,
  onchange,
  focused=false,
 onInput}) => {
  return (
    <>
        <TextField
            focused={focused}
            onChange={onchange}
            className={className}
            type={type}
            label={label} 
            placeholder={placeholder}
            required={required}
            { ...register(name, validation) }
            error={ isError }
            helperText={ errorMsg }
            variant={variant}
            multiline={multiline}
            size={size}
            fullWidth={fullWidth}
            InputProps={inputProps}
            onInput={onInput} />
    </>
  )
}