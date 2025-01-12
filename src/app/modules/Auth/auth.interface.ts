import { USER_ROLE } from './auth.const';

export type TUser = {
  userId: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'teacher' | 'student' | 'staff' | 'account_officer' | 'admin' | 'super_admin';
  status: 'active' | 'block';
  isDeleted: boolean
  isCompleted: boolean
};
export type TUserForLogin = {
  auth: string;
  password: string;
};

export type TUserExtends = Document &
  TUser & {
    comparePassword(candidatePassword: string): Promise<boolean>;
  };

export type TUserRole = keyof typeof USER_ROLE;

export type UserPayload = Partial<Record<keyof TUser, TUser[keyof TUser]>>;
