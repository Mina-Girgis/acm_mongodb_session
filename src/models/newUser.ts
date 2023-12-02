import mongoose from "mongoose";
import slugify from "slugify";

const newUserScheme = new mongoose.Schema(
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
    active: Boolean,
  },
  {}
);

const NewUser = mongoose.model("NewUser", newUserScheme);

newUserScheme.virtual("temp").get(function () {
  return this.age + 10;
});

// doc middleware
newUserScheme.pre("save", function (next) {
  this.name = slugify(this.name, { lower: true });
  console.log(this);
  console.log("first post ");
  next();
});

newUserScheme.post("save", function (doc, next) {
  console.log("first post ");
  console.log();
  next();
});

// query middleware
newUserScheme.pre(/^find/, function (next) {
  this.find({ active: true });
  // console.log(this);
  // this accesses the query
  next();
});
// aggreagate middleware

export default NewUser;
