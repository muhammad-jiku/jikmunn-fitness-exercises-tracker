"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const workout_routes_1 = require("../modules/workout/workout.routes");
const routes = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/workouts',
        route: workout_routes_1.WorkoutRoutes,
    },
];
moduleRoutes.forEach((r) => routes.use(r.path, r.route));
exports.default = routes;
