const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return false;
  }

  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email.trim());
};

export default validateEmail;
