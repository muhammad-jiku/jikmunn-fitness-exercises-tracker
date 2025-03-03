import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interfaces';

export interface IWorkout {
  category: string;
  workoutName: string;
  sets: number;
  reps: number;
  weight: number;
  duration: number;
  caloriesBurned: number;
  date: Date;
  user: Types.ObjectId | IUser;
}

export type IWorkoutModel = Model<IWorkout, Record<string, unknown>>;
