const express = require("express");
const userController = require("../controllers/userController");
// const newUserController = require("../controllers/userControllerFunctions");

const userRoute = express.Router();

userRoute
  .route("/")
  .post(userController.createNewUser)
  .get(userController.getAllUsers);

userRoute.route("/users/:id").get(userController.getUserById);

userRoute.route("/usersAge").get(userController.getUsersWithAge);

userRoute.route("/user/update/:id").put(userController.updateUser);

userRoute.route("/user/delete/:id").delete(userController.deleteUser);

userRoute.route("/user/delete").delete(userController.deleteAllUsers);

userRoute.route("/stat").get(userController.getStats);

userRoute.route("/solveProblem").get(userController.solveProblem);

module.exports = userRoute;
