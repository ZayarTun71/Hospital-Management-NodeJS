exports.appointmentNumberGenerate = () => {
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const randomNumber = Math.floor(10000 + Math.random() * 99999);

  const token = `${randomLetter}${randomNumber}`;
  return token;
};
