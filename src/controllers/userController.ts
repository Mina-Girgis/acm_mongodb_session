import { Response, Request } from "express";
import User from "./../models/user_model";
import Tour from "./../models/tour_model";
import fs from "fs";
exports.createNewUser = async (req: Request, res: Response, next: void) => {
  try {
    const { name, email, age, active, images } = req.body;
    const user = await User.create({ name, email, age, active, images });
    res.status(201).json({ message: "Success", user });
  } catch (err) {
    res.status(400).json({ message: "Error", err });
  }
};

exports.getAllUsers = async (req: Request, res: Response, next: void) => {
  const users = await User.find();
  res.status(200).json({ message: "Success", users });
};

exports.getUserById = async (req: Request, res: Response, next: void) => {
  const id = req.params.id;
  const user = await User.findById(id);
  console.log(user);
  res.status(200).json({ Success: true, user });
};

exports.getUsersWithAge = async (req: Request, res: Response, next: void) => {
  const users = await User.find({
    age: {
      $gte: 15,
    },
  });
  res.status(200).json({
    Sucess: true,
    users,
  });
};

exports.updateUser = async (req: Request, res: Response, next: void) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      name: name,
    },
    { new: true }
  );
  res.status(200).json({
    Sucess: true,
    user,
  });
};

exports.deleteUser = async (req: Request, res: Response, next: void) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  res.status(200).json({
    Sucess: true,
    message: "User Deleted.",
  });
};

exports.deleteAllUsers = async (req: Request, res: Response, next: void) => {
  const users = await User.deleteMany();
  res.status(200).json({
    Sucess: true,
    message: "Users deleted.",
  });
};

exports.getStats = async (req: Request, res: Response, next: void) => {
  //Example
  // calculate sum,avg,min,max for all Tours.
  const user = await Tour.aggregate([
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
};

exports.solveProblem = async (req: Request, res: Response, next: void) => {
  //Problem description
  // in our Tour Model (in models)
  // we need to know number of tours and their name in each month in 2021

  // 1- first unwind the array (startDates)
  // 2- match the start date as needed
  // 3- group by (_id)
  // 4- to change (_id) to (month) you need to add new field and give it the value of _id ,then project(delete) the _id
  const plan = await Tour.aggregate([
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
};
