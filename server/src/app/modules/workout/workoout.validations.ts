import { z } from 'zod';

const addWorkout = z.object({
  body: z
    .object({
      workoutString: z.string({
        required_error: 'Workout string is required',
      }),
    })
    .strict(),
});

const getWorkoutsByDate = z.object({
  query: z
    .object({
      date: z.string().optional(),
    })
    .strict()
    .optional(),
});

export const WorkoutValidations = {
  getWorkoutsByDate,
  addWorkout,
};
