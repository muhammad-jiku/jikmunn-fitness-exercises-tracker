"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
// user.routes.ts
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_controllers_1 = require("./user.controllers");
const user_validations_1 = require("./user.validations");
const router = express_1.default.Router();
router
    .route('/create')
    .post((0, validateRequest_1.validateRequest)(user_validations_1.UserValidations.createUser), user_controllers_1.UserControllers.createUser);
router
    .route('/login')
    .post((0, validateRequest_1.validateRequest)(user_validations_1.UserValidations.loginUser), user_controllers_1.UserControllers.loginUser);
// Dashboard route can be protected via auth middleware; validations are optional if using req.user.
router
    .route('/dashboard')
    .get((0, validateRequest_1.validateRequest)(user_validations_1.UserValidations.getUserDashboard), auth_1.auth, user_controllers_1.UserControllers.getUserDashboard);
exports.UserRoutes = router;
