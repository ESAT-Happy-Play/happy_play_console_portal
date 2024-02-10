const validateTxt = (
    name, 
    type='text', 
    required=false,
    fullWidth=true,
    size='small',
    variant='outlined',
    placeholder=null,
    label=null) => {
  return {
    name: name,
    label: (label !== null) ? label : `Enter ${name}`,
    type: type,
    placeholder: (placeholder !== null) ? placeholder : `Enter ${name}`,
    validation: {
        required: {
            value: required,
            message: 'required',
        },
        // minLength: {
        //     value: 6,
        //     message: 'min 6 characters',
        // },
    },
    variant: variant,
    size: size,
    required: required,
    fullWidth: fullWidth
  }
}

export { validateTxt } 