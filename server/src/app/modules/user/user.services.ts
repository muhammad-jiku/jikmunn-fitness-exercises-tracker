import httpStatus from 'http-status';
import { Secret, SignOptions } from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/handleApiError';
import { jwtHelpers } from '../../../helpers/jwt';
import { Workout } from '../workout/workout.models';
import { ILoginUser, ILoginUserResponse, IUser } from './user.interfaces';
import { User } from './user.models';

const insertUserIntoDB = async (user: IUser): Promise<IUser | null> => {
  // user password
  if (!user.password) {
    user.password = config.default.user_pass as string;
  }

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create user profile!'
      );
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ email: newUserAllData.email });
  }

  return newUserAllData;
};

const loginUserIntoDB = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(password, isUserExist?.password as string))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password mismatched!');
  }

  //   const { id: userId, role, needsPasswordChange } = isUserExist;
  const { email: userEmail } = isUserExist;

  // creating access and refresh tokens
  const accessToken = jwtHelpers.createToken(
    { userEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as SignOptions['expiresIn']
  );

  const refreshToken = jwtHelpers.createToken(
    { email: userEmail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as SignOptions['expiresIn']
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getUserDashboard = async (userId: string) => {
  // Retrieve the user based on the provided userId
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Setup today's date range
  const currentDate = new Date();
  const startToday = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const endToday = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 1
  );

  // Calculate total calories burnt today
  const totalCaloriesAgg = await Workout.aggregate([
    {
      $match: {
        user: user._id,
        date: { $gte: startToday, $lt: endToday },
      },
    },
    {
      $group: {
        _id: null,
        totalCaloriesBurnt: { $sum: '$caloriesBurned' },
      },
    },
  ]);
  const totalCaloriesBurnt =
    totalCaloriesAgg.length > 0 ? totalCaloriesAgg[0].totalCaloriesBurnt : 0;

  // Count the total number of workouts today
  const totalWorkouts = await Workout.countDocuments({
    user: user._id,
    date: { $gte: startToday, $lt: endToday },
  });

  // Calculate the average calories burnt per workout
  const avgCaloriesBurntPerWorkout =
    totalWorkouts > 0 ? totalCaloriesBurnt / totalWorkouts : 0;

  // Aggregate calories burnt by workout category for today
  const categoryCaloriesAgg = await Workout.aggregate([
    {
      $match: {
        user: user._id,
        date: { $gte: startToday, $lt: endToday },
      },
    },
    {
      $group: {
        _id: '$category',
        totalCaloriesBurnt: { $sum: '$caloriesBurned' },
      },
    },
  ]);

  // Format the category data for a pie chart
  const pieChartData = categoryCaloriesAgg.map(
    (category: { totalCaloriesBurnt: any; _id: any }, index: any) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    })
  );

  // Collect daily calories burnt data for the past 7 days
  const weeks: string[] = [];
  const caloriesBurnt: number[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
    weeks.push(`${date.getDate()}th`);

    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const weekData = await Workout.aggregate([
      {
        $match: {
          user: user._id,
          date: { $gte: startOfDay, $lt: endOfDay },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          totalCaloriesBurnt: { $sum: '$caloriesBurned' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    caloriesBurnt.push(
      weekData.length > 0 ? weekData[0].totalCaloriesBurnt : 0
    );
  }

  // Return the formatted dashboard data
  return {
    totalCaloriesBurnt,
    totalWorkouts,
    avgCaloriesBurntPerWorkout,
    totalWeeksCaloriesBurnt: {
      weeks,
      caloriesBurned: caloriesBurnt,
    },
    pieChartData,
  };
};

export const UserServices = {
  insertUserIntoDB,
  loginUserIntoDB,
  getUserDashboard,
};
