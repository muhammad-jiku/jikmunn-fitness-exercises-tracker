"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string({
            required_error: 'Password is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    })
        .strict(),
});
const loginUser = zod_1.z.object({
    body: zod_1.z
        .object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    })
        .strict(),
});
const getUserDashboard = zod_1.z.object({});
exports.UserValidations = {
    createUser,
    loginUser,
    getUserDashboard,
};
