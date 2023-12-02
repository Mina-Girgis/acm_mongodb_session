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
const user_model_1 = __importDefault(require("./../models/user_model"));
const tour_model_1 = __importDefault(require("./../models/tour_model"));
exports.createNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, age, active, images } = req.body;
        const user = yield user_model_1.default.create({ name, email, age, active, images });
        res.status(201).json({ message: "Success", user });
    }
    catch (err) {
        res.status(400).json({ message: "Error", err });
    }
});
exports.getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find();
    res.status(200).json({ message: "Success", users });
});
exports.getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_model_1.default.findById(id);
    console.log(user);
    res.status(200).json({ Success: true, user });
});
exports.getUsersWithAge = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({
        age: {
            $gte: 15,
        },
    });
    res.status(200).json({
        Sucess: true,
        users,
    });
});
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    const user = yield user_model_1.default.findByIdAndUpdate(id, {
        name: name,
    }, { new: true });
    res.status(200).json({
        Sucess: true,
        user,
    });
});
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.default.findByIdAndDelete(id);
    res.status(200).json({
        Sucess: true,
        message: "User Deleted.",
    });
});
exports.deleteAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.deleteMany();
    res.status(200).json({
        Sucess: true,
        message: "Users deleted.",
    });
});
exports.getStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Example
    // calculate sum,avg,min,max for all Tours.
    const user = yield tour_model_1.default.aggregate([
        { $match: { ratingsAverage: { $gte: 2 } } },
        {
            $group: {
                _id: null,
                average: { $avg: "$ratingsAverage" },
                min: { $min: "$ratingsAverage" },
                max: { $max: "$ratingsAverage" },
                sum: { $sum: "$ratingsAverage" },
                counter: { $sum: 1 },
            },
        },
        {
            $sort: { average: 1 },
        },
    ]);
    res.json({ user });
});
exports.solveProblem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Problem description
    // in our Tour Model (in models)
    // we need to know number of tours and their name in each month in 2021
    // 1- first unwind the array (startDates)
    // 2- match the start date as needed
    // 3- group by (_id)
    // 4- to change (_id) to (month) you need to add new field and give it the value of _id ,then project(delete) the _id
    const plan = yield tour_model_1.default.aggregate([
        {
            $unwind: "$startDates",
        },
        {
            $match: {
                startDates: {
                    $gte: new Date("2021-01-05"),
                    $lte: new Date("2021-12-31"),
                },
            },
        },
        {
            $group: {
                _id: { $month: "$startDates" },
                numberOfTours: { $sum: 1 },
                tours: {
                    $push: "$name",
                },
            },
        },
        {
            $addFields: { month: "$_id" },
        },
        {
            $project: {
                _id: 0,
            },
        },
        {
            $sort: { numberOfTours: -1 },
        },
        {
            $limit: 10,
        },
    ]);
    res.status(200).json({ plan });
});
