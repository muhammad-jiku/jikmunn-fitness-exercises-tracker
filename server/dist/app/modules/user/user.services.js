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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const handleApiError_1 = __importDefault(require("../../../errors/handleApiError"));
const jwt_1 = require("../../../helpers/jwt");
const workout_models_1 = require("../workout/workout.models");
const user_models_1 = require("./user.models");
const insertUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = config_1.default.default.user_pass;
    }
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield user_models_1.User.create([user], { session });
        if (!newUser.length) {
            throw new handleApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user profile!');
        }
        // Convert the Mongoose document to a plain object
        newUserAllData = newUser[0].toObject();
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        // Use lean() to get a plain JS object, ensuring type consistency
        newUserAllData = (yield user_models_1.User.findOne({
            email: newUserAllData.email,
        }).lean());
        const accessToken = jwt_1.jwtHelpers.createToken({ email: newUserAllData.email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        const refreshToken = jwt_1.jwtHelpers.createToken({ email: newUserAllData.email }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
        return {
            user: newUserAllData,
            accessToken,
            refreshToken,
        };
    }
    return null;
});
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const userExist = yield user_models_1.User.isUserExist(email);
    if (!userExist) {
        throw new handleApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist!');
    }
    // Cast the result to a full IUser (assuming img and age can be optional)
    const fullUser = userExist;
    if (fullUser.password &&
        !(yield user_models_1.User.isPasswordMatch(password, fullUser.password))) {
        throw new handleApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password mismatched!');
    }
    const accessToken = jwt_1.jwtHelpers.createToken({ email: fullUser.email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwt_1.jwtHelpers.createToken({ email: fullUser.email }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        user: fullUser,
        accessToken,
        refreshToken,
    };
});
const getUserDashboard = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // Retrieve the user based on the provided userId
    const user = yield user_models_1.User.findOne({ email: userEmail });
    if (!user) {
        throw new handleApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Setup today's date range
    const currentDate = new Date();
    const startToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    // Calculate total calories burnt today
    const totalCaloriesAgg = yield workout_models_1.Workout.aggregate([
        {
            $match: {
                user: user._id,
                date: { $gte: startToday, $lt: endToday },
            },
        },
        {
            $group: {
                _id: null,
                totalCaloriesBurnt: { $sum: '$caloriesBurned' },
            },
        },
    ]);
    const totalCaloriesBurnt = totalCaloriesAgg.length > 0 ? totalCaloriesAgg[0].totalCaloriesBurnt : 0;
    // Count the total number of workouts today
    const totalWorkouts = yield workout_models_1.Workout.countDocuments({
        user: user._id,
        date: { $gte: startToday, $lt: endToday },
    });
    // Calculate the average calories burnt per workout
    const avgCaloriesBurntPerWorkout = totalWorkouts > 0 ? totalCaloriesBurnt / totalWorkouts : 0;
    // Aggregate calories burnt by workout category for today
    const categoryCaloriesAgg = yield workout_models_1.Workout.aggregate([
        {
            $match: {
                user: user._id,
                date: { $gte: startToday, $lt: endToday },
            },
        },
        {
            $group: {
                _id: '$category',
                totalCaloriesBurnt: { $sum: '$caloriesBurned' },
            },
        },
    ]);
    // Format the category data for a pie chart
    const pieChartData = categoryCaloriesAgg.map((category, index) => ({
        id: index,
        value: category.totalCaloriesBurnt,
        label: category._id,
    }));
    // Collect daily calories burnt data for the past 7 days
    const weeks = [];
    const caloriesBurnt = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
        weeks.push(`${date.getDate()}th`);
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        const weekData = yield workout_models_1.Workout.aggregate([
            {
                $match: {
                    user: user._id,
                    date: { $gte: startOfDay, $lt: endOfDay },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                    totalCaloriesBurnt: { $sum: '$caloriesBurned' },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        caloriesBurnt.push(weekData.length > 0 ? weekData[0].totalCaloriesBurnt : 0);
    }
    // Return the formatted dashboard data
    return {
        totalCaloriesBurnt,
        totalWorkouts,
        avgCaloriesBurntPerWorkout,
        totalWeeksCaloriesBurnt: {
            weeks,
            caloriesBurned: caloriesBurnt,
        },
        pieChartData,
    };
});
exports.UserServices = {
    insertUserIntoDB,
    loginUserIntoDB,
    getUserDashboard,
};
