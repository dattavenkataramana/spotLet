 
  

function LoginValidation(values) {
  let errors = {};

   
  if (!values.firstName ) {
      errors.firstName = "First name is required";
  } else if (values.firstName.length < 5) {
      errors.firstName = "First name must be at least 5 characters";
  }

  if (!values.lastName) {
    errors.lastName = "Last name is required";
} else if (values.lastName.length < 5) {
    errors.lastName = "First name must be at least 5 characters";
}
   
  if (!values.email) {
      errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
  }

  
  if (!values.mobileNUmber) {
      errors.mobileNumber = "Mobile number is required";
  } else if (!/^\d{10}$/.test(values.mobileNUmber)) {
      errors.mobileNUmber = "Mobile number must be 10 digits";
  }

   
  if (!values.password) {
      errors.password = "Password is required";
  } else if (values.password.length < 5) {
      errors.password = "Password must be at least 5 characters";
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(values.password)) {
      errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  }

  return errors;
}

export default LoginValidation;
