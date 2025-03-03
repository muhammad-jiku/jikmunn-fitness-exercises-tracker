import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../../config';
import { IUser, IUserModel } from './user.interfaces';

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    img: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    age: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// statics methods for checking user existence
userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'name' | 'email' | 'password'> | null> {
  const user = await User.findOne(
    { email },
    { name: 1, email: 1, password: 1 }
  );

  return user;
};

// statics methods for checking password matches
userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword);

  return isMatched;
};

// hashing password during user creation // the method is either user.save() or user.create()
userSchema.pre('save', async function (next) {
  // hash user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

export const User: IUserModel = model<IUser, IUserModel>('User', userSchema);
