const ValidateUsername = () => {
  return {
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    validation: { required: true },
    variant: 'outlined',
    size: 'small',
    required: true,
    fullWidth: true
  }
}

const ValidatePassword = (eye) => {
  return {
    name: 'password',
    type: (eye) ? "text" : "password",
    placeholder: 'Password',
    validation: { 
        required: true,
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