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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var users_1 = require("../../models/users");
var auth_1 = __importDefault(require("../../middleware/auth"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var userRoute = express_1["default"].Router();
var userStore = new users_1.UserStore();
var serect = String(process.env.SECRET_TOKEN);
// get list of users
userRoute.get("/", auth_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizeHeader, token, users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    authorizeHeader = req.headers.authorization;
                    token = String(authorizeHeader).split(" ")[1];
                    jsonwebtoken_1["default"].verify(token, serect);
                }
                catch (error) {
                    res.status(401).send({ message: "".concat(error) });
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userStore.index()];
            case 2:
                users = _a.sent();
                res
                    .status(200)
                    .json({ message: "Get list of users successfully", data: users });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(500).send({ message: "".concat(error_1) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// get info just one user
userRoute.get("/:id", auth_1["default"], function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = parseInt(_req.params.id);
                if (!(userId && typeof userId == "number")) return [3 /*break*/, 2];
                return [4 /*yield*/, userStore.showUserInfo(userId)];
            case 1:
                user = _a.sent();
                res
                    .status(200)
                    .json({ message: "Get user info successfully", data: user });
                return [2 /*return*/, user];
            case 2:
                res
                    .status(400)
                    .send({ message: "Invalid userId or user id must be a number" });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.status(500).send({ message: "".concat(error_2) });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// sign up
userRoute.post("/signUp", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, signUpUser, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                newUser = {
                    fistName: req.body.first_name,
                    lastName: req.body.last_name,
                    userName: req.body.userName,
                    password: req.body.password
                };
                if (!(newUser.userName &&
                    newUser.password &&
                    newUser.fistName &&
                    newUser.lastName)) return [3 /*break*/, 2];
                return [4 /*yield*/, userStore.createUser(newUser)];
            case 1:
                signUpUser = _a.sent();
                res.status(200).json({
                    message: "Sign up successfully",
                    token: signUpUser
                });
                return [3 /*break*/, 3];
            case 2:
                res.status(400).send({
                    message: "Please input username, password, firstname, lastname"
                });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                res.status(422).json({
                    message: "".concat(error_3),
                    data: null
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
//create new user with Admin account
userRoute.post("/", auth_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, createdUser, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newUser = {
                    fistName: req.body.first_name,
                    lastName: req.body.last_name,
                    userName: req.body.userName,
                    password: req.body.password
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!(newUser.userName &&
                    newUser.password &&
                    newUser.fistName &&
                    newUser.lastName)) return [3 /*break*/, 3];
                return [4 /*yield*/, userStore.createUser(newUser)];
            case 2:
                createdUser = _a.sent();
                res.status(200).json({
                    message: "Create user successfully",
                    data: createdUser
                });
                return [3 /*break*/, 4];
            case 3:
                res.status(400).send({
                    message: "Please input username, password, firstname, lastname"
                });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                res.status(422).json({
                    message: "".concat(error_4),
                    data: null
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// authenticate to get token (login)
userRoute.post("/authenticate", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userName, password, authenUser, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userName = req.body.userName;
                password = req.body.password;
                if (!(userName && password)) return [3 /*break*/, 2];
                return [4 /*yield*/, userStore.authenticate(userName, password)];
            case 1:
                authenUser = _a.sent();
                res.status(200).json({
                    message: "Login Successfully",
                    token: authenUser
                });
                return [3 /*break*/, 3];
            case 2:
                res
                    .status(400)
                    .send({ message: "Please input username, password to login" });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                res.status(403).json({
                    message: "".concat(error_5),
                    data: null
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports["default"] = userRoute;