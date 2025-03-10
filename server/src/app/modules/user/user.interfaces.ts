import { Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  img: string;
  password: string;
  age: number;
}

export type IUserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'name' | 'email' | 'password'>>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginUserResponse {
  user: IUser;
  accessToken: string;
  refreshToken?: string;
}

export interface IUserResponse {
  user: IUser;
  accessToken: string;
  refreshToken?: string;
}
