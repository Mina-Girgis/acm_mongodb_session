import mongoose from "mongoose";
import slugify from "slugify";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name field is required"],
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      unique: true,
    },
    age: {
      type: Number,
      required: [true, "age field is required"],
    },
    createDate: {
      type: Date,
      default: new Date(),
    },
    images: {
      type: [String],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    // To be able to use (virtual feature) we need to add these two lines.
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("temp").get(function () {
  // this value is not stored in databse but can be calculated after getting data from database.
  return this.age + 10;
});

//Document middleware
userSchema.pre("save", function (next) {
  // do something before doc is saved.

  // change name to lower case.
  this.name = slugify(this.name, { lower: true });
  next();
});

userSchema.post("save", function (doc, next) {
  // do something after doc is saved.
  console.log(doc);
  next();
});

// Query Middleware
userSchema.pre(/^find/, function (next) {
  // instead of getting active users every time in controllers
  // i can create a regex and use query middleware to do all that stuff only once!

  // we active users before find
  this.find({ active: true });
  next(); // don't forget next().
});

// aggregate middleware
userSchema.pre("aggregate", function (next) {
  // ** this.pipeline() it is an array **
  // when using aggregate we still can access inactive users
  // we want to prevend that
  // we add extra stage in the beginning of the array to only $match the active users in our databse
  // this access aggregation object
  // unshift -> add stage at beginning of the array (pushFront)
  this.pipeline().unshift({ $match: { active: true } });
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
