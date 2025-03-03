import { z } from 'zod';

const createUser = z.object({
  body: z
    .object({
      email: z.string({ required_error: 'Email is required' }).email(),
      // If no password is provided, the service will assign a default
      password: z.string().optional(),
      // Add any other required user properties here (e.g., name)
    })
    .strict(),
});

const loginUser = z.object({
  body: z
    .object({
      email: z.string({ required_error: 'Email is required' }).email(),
      password: z.string({ required_error: 'Password is required' }),
    })
    .strict(),
});

// For dashboard, we assume the user is identified via auth (req.user) so no extra validations are needed.
// You can always add a schema if needed.
const getUserDashboard = z.object({});

export const UserValidations = {
  createUser,
  loginUser,
  getUserDashboard,
};
