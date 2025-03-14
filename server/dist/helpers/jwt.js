"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, secret, expireTime) => {
    const options = { expiresIn: expireTime };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
const verifyToken = (payload, secret) => {
    console.log('payload', payload);
    console.log('secret', secret);
    return jsonwebtoken_1.default.verify(payload, secret);
};
exports.jwtHelpers = {
    createToken,
    verifyToken,
};
