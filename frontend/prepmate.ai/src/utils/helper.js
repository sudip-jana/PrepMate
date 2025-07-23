const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return false;
  }

  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email.trim());
};

export default validateEmail;

export const getInitials = (title) => {
  if(!title) return "";

  const words = title.split(" ");
  let initials = "";

  for(let i = 0; i<Math.min(words.length,2);i++){
    initials += words[i][0];
  }

  return initials.toUpperCase();
}