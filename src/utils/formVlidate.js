export const formValidate = (fullName, email, password) => {
  // Validate Full Name
  const isFullNameValid = /^[A-Za-z\s]{2,}$/.test(fullName);
  if (!isFullNameValid) {
    return "Invalid name format";
  }

  // Validate Email
  const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  if (!isEmailValid) {
    return "Invalid email format";
  }

  // Validate Password
  const isPasswordValid =
    password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  if (!isPasswordValid) {
    return "Password must be at least 8 characters long and contain at least one uppercase letter and one number";
  }

  // No errors, validation passed
  return null;
};
