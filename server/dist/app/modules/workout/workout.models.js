"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
