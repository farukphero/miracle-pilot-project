import { Auth } from './auth.model';
import jwt from 'jsonwebtoken';

const findLastUserId = async () => {
  const lastUser = await Auth.findOne({ userId: { $exists: true } })
    .sort({ _id: -1 })
    .select('userId')
    .lean();

  return lastUser?.userId ? lastUser.userId.substring(5) : undefined;
};

export const generateUserId = async () => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const currentId = (await findLastUserId()) || (0).toString();

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `MC-${currentYear}${incrementId}`;

  return incrementId;
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
