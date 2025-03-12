"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = require("../../middlewares/validateRequest");
const workoout_validations_1 = require("./workoout.validations");
const workout_controllers_1 = require("./workout.controllers");
const router = express_1.default.Router();
router
    .route('/')
    .get((0, validateRequest_1.validateRequest)(workoout_validations_1.WorkoutValidations.getWorkoutsByDate), auth_1.auth, workout_controllers_1.WorkoutControllers.getWorkoutsByDate);
router
    .route('/add')
    .post((0, validateRequest_1.validateRequest)(workoout_validations_1.WorkoutValidations.addWorkout), auth_1.auth, workout_controllers_1.WorkoutControllers.addWorkout);
exports.WorkoutRoutes = router;
