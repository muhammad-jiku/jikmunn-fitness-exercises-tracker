// workout.services.ts
import httpStatus from 'http-status';
import ApiError from '../../../errors/handleApiError';
import { User } from '../user/user.models';
import { Workout } from './workout.models';
import { WorkoutUtils } from './workout.utils';

/**
 * Retrieves workouts for a given user on a specific date.
 * @param userId - The ID of the user.
 * @param dateString - (Optional) A date string to query workouts for; if omitted, defaults to today.
 * @returns An object containing today's workouts and the total calories burned.
 * @throws ApiError if the user is not found.
 */
export const getWorkoutsByDate = async (
  userId: string,
  dateString?: string
): Promise<{ todaysWorkouts: any[]; totalCaloriesBurned: number }> => {
  // Verify user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Use provided date or default to current date
  const date = dateString ? new Date(dateString) : new Date();
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

  // Fetch workouts for the given date range
  const todaysWorkouts = await Workout.find({
    user: userId,
    date: { $gte: startOfDay, $lt: endOfDay },
  });

  // Sum calories burned across all workouts
  const totalCaloriesBurned = todaysWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return { todaysWorkouts, totalCaloriesBurned };
};

/**
 * Adds workouts parsed from a workout string.
 * @param userId - The ID of the user to which the workouts belong.
 * @param workoutString - A string containing one or more workouts; workouts are separated by ";".
 *                        Each workout should start with a category indicated by "#" and contain details in subsequent lines.
 * @returns An object with a success message and the parsed workout data.
 * @throws ApiError for various input errors (missing workout string, missing categories, or bad format).
 */
export const addWorkout = async (
  userId: string,
  workoutString: string
): Promise<{ message: string; workouts: any[] }> => {
  if (!workoutString) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Workout string is missing');
  }

  // Split the workoutString into individual workout lines.
  const eachWorkout = workoutString.split(';').map((line) => line.trim());
  // Ensure there is at least one line that defines a category.
  const categories = eachWorkout.filter((line) => line.startsWith('#'));
  if (categories.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'No categories found in workout string'
    );
  }

  const parsedWorkouts: any[] = [];
  let count = 0;
  let currentCategory = '';

  // Process each workout string line.
  for (const line of eachWorkout) {
    count++;
    if (line.startsWith('#')) {
      // Split the line by newline to get all parts.
      const parts = line.split('\n').map((part) => part.trim());
      if (parts.length < 5) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          `Workout string is missing details for ${count}th workout`
        );
      }

      // The first line (without the "#") defines the category.
      currentCategory = parts[0].substring(1).trim();
      // Parse workout details using the utility function.
      const workoutDetails = WorkoutUtils.parseWorkoutLine(parts);
      if (!workoutDetails) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Please enter the workout details in the proper format'
        );
      }

      // Add the current category to the parsed workout.
      workoutDetails.category = currentCategory;
      parsedWorkouts.push(workoutDetails);
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Workout string is missing for ${count}th workout`
      );
    }
  }

  // For each parsed workout, calculate the calories burned and save it to the database.
  for (const workout of parsedWorkouts) {
    // Calculate calories burned (ensure duration and weight are numbers).
    workout.caloriesBurned = parseFloat(
      WorkoutUtils.calculateCaloriesBurned(workout).toString()
    );
    // Save the workout with the associated user.
    await Workout.create({ ...workout, user: userId });
  }

  return {
    message: 'Workouts added successfully',
    workouts: parsedWorkouts,
  };
};

export const WorkoutServices = {
  getWorkoutsByDate,
  addWorkout,
};
