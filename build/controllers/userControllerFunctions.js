"use strict";
// import { Response, Request } from "express";
// import User from "./../models/user_model";
// import Tour from "./../models/tour_model";
// import NewUser from "./../models/newUser";
Object.defineProperty(exports, "__esModule", { value: true });
// // exports.createNewUser = async (req: Request, res: Response, next: void) => {
// //   console.log(req.body.number);
// //   const { name, email, age, images } = req.body;
// //   const user = await NewUser.create({ name, email, age, images });
// //   res.status(201).json({
// //     Sucess: true,
// //     user,
// //   });
// // };
// // exports.getAllUsers = async (req: Request, res: Response, next: void) => {
// //   const users = await NewUser.find();
// //   res.status(200).json({
// //     Sucess: true,
// //     users,
// //   });
// // };
// // exports.getUserById = async (req: Request, res: Response, next: void) => {
// //   const { id } = req.params;
// //   const user = await NewUser.findById(id);
// //   res.status(200).json({
// //     Sucess: true,
// //     user,
// //   });
// // };
// // CRUD
// // exports.getUsersWithAge = async (req: Request, res: Response, next: void) => {
// //   const { first, second } = req.params;
// //   const users = await NewUser.find({
// //     age: {
// //       $gte: 15,
// //       $lt: 22,
// //     },
// //   });
// //   res.status(200).json({
// //     Sucess: true,
// //     users,
// //   });
// // };
// exports.updateUser = async (req: Request, res: Response, next: void) => {
//   const { id } = req.body;
//   const user = NewUser.findByIdAndUpdate(id, {
//     name: "Islam",
//   });
//   res.status(200).json({
//     Sucess: true,
//     user,
//   });
// };
// exports.deleteUser = async (req: Request, res: Response, next: void) => {
//   const { id } = req.body;
//   const user = NewUser.findByIdAndDelete(id);
//   res.status(200).json({
//     Sucess: true,
//     user,
//   });
// };
// exports.deleteAllUsers = async (req: Request, res: Response, next: void) => {
//   const { id } = req.body;
//   const user = NewUser.deleteMany();
//   res.status(200).json({
//     Sucess: true,
//     user,
//   });
// };
// exports.getStats = async (req: Request, res: Response, next: void) => {
//   const result = await Tour.aggregate([
//     {
//       $match: {
//         ratingsAverage: {
//           $gte: 2,
//         },
//       },
//     },
//     {
//       $group: {
//         _id: "$difficulty",
//         summ: { $sum: "$duration" },
//         minum: { $min: "$duration" },
//         maxx: { $max: "$duration" },
//         average: { $avg: "$duration" },
//         counter: { $sum: 1 },
//       },
//     },
//     {
//       $match: {
//         _id: "medium",
//       },
//     },
//   ]);
//   res.status(200).json({
//     Sucess: true,
//     result,
//   });
// };
// exports.solveProblem = async (req: Request, res: Response, next: void) => {
//   const year: number = 2021;
//   const plan = Tour.aggregate([
//     {
//       $unwind: "startDates",
//     },
//     {
//       $match: {
//         startDates: {
//           $gte: new Date(`${year}-01-01`),
//           $lte: new Date(`${year}-12-31`),
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { $month: "startDates" },
//         numberofTours: { $sum: 1 },
//         tours: {
//           $push: "$name",
//         },
//       },
//     },
//   ]);
//   res.status(200).json({ plan });
// };
