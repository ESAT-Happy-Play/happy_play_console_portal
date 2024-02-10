const ValidateUsername = () => {
  return {
    name: 'username',
    label: 'Mobile Number',
    type: 'text',
    placeholder: 'Enter mobile number',
    validation: { required: "Mobile number is required" },
    variant: 'outlined',
    size: 'small',
    required: true,
    fullWidth: true
  }
}

const ValidatePassword = (eye) => {
  return {
    name: 'Password',
    label: 'Password',
    type: (eye) ? "text" : "password",
    placeholder: 'Enter password',
    validation: { 
        required: "Password is required",
        minLength: {
            value: 5,
            message: "min length is 5"
        }
    },
    variant: 'outlined',
    size: 'small',
    required: true,
    fullWidth: true
  }
}

export { ValidateUsername, ValidatePassword } 