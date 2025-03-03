import { IWorkout } from './workout.interfaces';

// Function to parse workout details from a line
const parseWorkoutLine = (parts: string[]): Partial<IWorkout> | null => {
  console.log(parts);
  if (parts.length >= 5) {
    const details: Partial<IWorkout> = {
      workoutName: parts[1].substring(1).trim(),
      sets: parseInt(parts[2].split('sets')[0].substring(1).trim()),
      reps: parseInt(
        parts[2].split('sets')[1].split('reps')[0].substring(1).trim()
      ),
      weight: parseFloat(parts[3].split('kg')[0].substring(1).trim()),
      duration: parseFloat(parts[4].split('min')[0].substring(1).trim()),
    };

    console.log(details);
    return details;
  }

  return null;
};

// Function to calculate calories burnt for a workout
const calculateCaloriesBurned = (workoutDetails: {
  duration: number;
  weight: number;
}): number => {
  const caloriesBurnedPerMinute = 5; // Sample value; adjust according to your calculation logic

  return (
    workoutDetails.duration * caloriesBurnedPerMinute * workoutDetails.weight
  );
};

export const WorkoutUtils = {
  parseWorkoutLine,
  calculateCaloriesBurned,
};
