export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateExpiryTime = () => {
  return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
}; 