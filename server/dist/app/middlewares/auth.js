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
exports.auth = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const handleApiError_1 = __importDefault(require("../../errors/handleApiError"));
const jwt_1 = require("../../helpers/jwt");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        console.log('auth header: ' + authHeader);
        if (!authHeader) {
            throw new handleApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Sorry, you are not authorized to access this route!');
        }
        const token = authHeader.split(' ')[1];
        console.log('token ', token);
        if (!token) {
            throw new handleApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid token format!');
        }
        const verifiedUserToken = jwt_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        req.user = verifiedUserToken;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.auth = auth;
