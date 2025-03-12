"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutValidations = void 0;
const zod_1 = require("zod");
const addWorkout = zod_1.z.object({
    body: zod_1.z
        .object({
        workoutString: zod_1.z.string({
            required_error: 'Workout string is required',
        }),
    })
        .strict(),
});
const getWorkoutsByDate = zod_1.z.object({
    query: zod_1.z
        .object({
        date: zod_1.z.string().optional(),
    })
        .strict()
        .optional(),
});
exports.WorkoutValidations = {
    getWorkoutsByDate,
    addWorkout,
};
