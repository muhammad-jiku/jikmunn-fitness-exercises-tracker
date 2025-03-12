"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutServices = exports.addWorkout = exports.getWorkoutsByDate = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleApiError_1 = __importDefault(require("../../../errors/handleApiError"));
const user_models_1 = require("../user/user.models");
const workout_models_1 = require("./workout.models");
const workout_utils_1 = require("./workout.utils");
/**
 * Retrieves workouts for a given user on a specific date.
 * @param userId - The ID of the user.
 * @param dateString - (Optional) A date string to query workouts for; if omitted, defaults to today.
 * @returns An object containing today's workouts and the total calories burned.
 * @throws ApiError if the user is not found.
 */
const getWorkoutsByDate = (userEmail, dateString) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify user exists
    const user = yield user_models_1.User.findOne({ email: userEmail });
    if (!user) {
        throw new handleApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Use provided date or default to current date
    const date = dateString ? new Date(dateString) : new Date();
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    // Fetch workouts for the given date range
    const todaysWorkouts = yield workout_models_1.Workout.find({
        user: user._id,
        date: { $gte: startOfDay, $lt: endOfDay },
    });
    // Sum calories burned across all workouts
    const totalCaloriesBurned = todaysWorkouts.reduce((total, workout) => total + workout.caloriesBurned, 0);
    return { todaysWorkouts, totalCaloriesBurned };
});
exports.getWorkoutsByDate = getWorkoutsByDate;
/**
 * Adds workouts parsed from a workout string.
 * @param userEmail - The ID of the user to which the workouts belong.
 * @param workoutString - A string containing one or more workouts; workouts are separated by ";".
 *                        Each workout should start with a category indicated by "#" and contain details in subsequent lines.
 * @returns An object with a success message and the parsed workout data.
 * @throws ApiError for various input errors (missing workout string, missing categories, or bad format).
 */
const addWorkout = (userEmail, workoutString) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_models_1.User.findOne({ email: userEmail });
    if (!user) {
        throw new handleApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (!workoutString) {
        throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, 'Workout string is missing');
    }
    // Split the workoutString into individual workout lines.
    const eachWorkout = workoutString.split(';').map((line) => line.trim());
    // Ensure there is at least one line that defines a category.
    const categories = eachWorkout.filter((line) => line.startsWith('#'));
    if (categories.length === 0) {
        throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, 'No categories found in workout string');
    }
    const parsedWorkouts = [];
    let count = 0;
    let currentCategory = '';
    // Process each workout string line.
    for (const line of eachWorkout) {
        count++;
        if (line.startsWith('#')) {
            // Split the line by newline to get all parts.
            const parts = line.split('\n').map((part) => part.trim());
            if (parts.length < 5) {
                throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, `Workout string is missing details for ${count}th workout`);
            }
            // The first line (without the "#") defines the category.
            currentCategory = parts[0].substring(1).trim();
            // Parse workout details using the utility function.
            const workoutDetails = workout_utils_1.WorkoutUtils.parseWorkoutLine(parts);
            if (!workoutDetails) {
                throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, 'Please enter the workout details in the proper format');
            }
            // Add the current category to the parsed workout.
            workoutDetails.category = currentCategory;
            parsedWorkouts.push(workoutDetails);
        }
        else {
            throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, `Workout string is missing for ${count}th workout`);
        }
    }
    // For each parsed workout, calculate the calories burned and save it to the database.
    for (const workout of parsedWorkouts) {
        // Calculate calories burned (ensure duration and weight are numbers).
        workout.caloriesBurned = parseFloat(workout_utils_1.WorkoutUtils.calculateCaloriesBurned(workout).toString());
        // Save the workout with the associated user.
        yield workout_models_1.Workout.create(Object.assign(Object.assign({}, workout), { user: user._id }));
    }
    return {
        message: 'Workouts added successfully',
        workouts: parsedWorkouts,
    };
});
exports.addWorkout = addWorkout;
exports.WorkoutServices = {
    getWorkoutsByDate: exports.getWorkoutsByDate,
    addWorkout: exports.addWorkout,
};
