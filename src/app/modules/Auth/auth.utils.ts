import jwt from 'jsonwebtoken';

 

export const generateUserId = async () => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  // Generate a random 4-digit number and pad it to ensure 4 digits.
  let randomId = Math.floor(1000 + Math.random() * 9000).toString();

  randomId = `MC-${currentYear}${randomId}`;

  return randomId;
};

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
