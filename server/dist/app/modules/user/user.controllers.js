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
exports.UserControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = require("../../../shared/sendResponse");
const user_services_1 = require("./user.services");
const createUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const result = yield user_services_1.UserServices.insertUserIntoDB(userData);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        return next(error);
    }
}));
const loginUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginData = req.body;
        const result = yield user_services_1.UserServices.loginUserIntoDB(loginData);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User logged in successfully!',
            data: result,
        });
    }
    catch (error) {
        return next(error);
    }
}));
const getUserDashboard = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Assuming req.user is populated by an auth middleware
        const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        console.log('user id', req.user);
        const result = yield user_services_1.UserServices.getUserDashboard(userEmail);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User dashboard data retrieved successfully!',
            data: result,
        });
    }
    catch (error) {
        return next(error);
    }
}));
exports.UserControllers = {
    createUser,
    loginUser,
    getUserDashboard,
};
