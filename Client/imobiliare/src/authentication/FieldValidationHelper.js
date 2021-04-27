export const isNameValid = (name) => {
  const regExp = /(^[A-Z][a-z]{1,20})/g;
  return regExp.test(name);
};

export const isUsernameValid = (username) => {
  const regExp = /^[a-zA-Z0-9]+$/i;
  return username.length > 5 && regExp.test(username);
};

export const isEmailValid = (email) => {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(email.toLowerCase());
};

export const isPasswordValid = (password) => {
  const regExp = /[a-zA-Z]/g;
  return password.length > 7 && /\d/.test(password) && regExp.test(password);
};

export const isConfirmPasswordValid = (
  password,
  confirmPassword,
) => isPasswordValid(confirmPassword)
    && password === confirmPassword;

const isAccountValid = (allFields) => isUsernameValid(allFields.username)
        && isNameValid(allFields.firstName)
        && isNameValid(allFields.lastName)
        && isPasswordValid(allFields.password)
        && isConfirmPasswordValid(allFields.password, allFields.confirmPassword)
        && isEmailValid(allFields.email);
export default isAccountValid;
