import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { WorkoutRoutes } from '../modules/workout/workout.routes';

const routes = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/workouts',
    route: WorkoutRoutes,
  },
];

moduleRoutes.forEach((r) => routes.use(r.path, r.route));
export default routes;
