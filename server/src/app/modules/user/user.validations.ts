import { z } from 'zod';

const createUser = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'Password is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      password: z.string({
        required_error: 'Password is required',
      }),
    })
    .strict(),
});

const loginUser = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      password: z.string({
        required_error: 'Password is required',
      }),
    })
    .strict(),
});

const getUserDashboard = z.object({});

export const UserValidations = {
  createUser,
  loginUser,
  getUserDashboard,
};
