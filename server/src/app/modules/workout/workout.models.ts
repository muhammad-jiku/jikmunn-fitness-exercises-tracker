import { model, Schema } from 'mongoose';
import { IWorkout, IWorkoutModel } from './workout.interfaces';

const workoutSchema = new Schema<IWorkout, IWorkoutModel>(
  {
    category: {
      type: String,
      required: true,
    },
    workoutName: {
      type: String,
      required: true,
      unique: true,
    },
    sets: {
      type: Number,
      required: false,
    },
    reps: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    caloriesBurned: {
      type: Number,
      required: false,
    },
    date: {
      type: Date,
      required: false,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Workout: IWorkoutModel = model<IWorkout, IWorkoutModel>(
  'Workout',
  workoutSchema
);
