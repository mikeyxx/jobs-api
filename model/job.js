const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Please enter a role"],
      maxLength: 100,
    },
    salary: String,
    jobType: {
      type: String,
      enum: ["Intern", "Full-Time", "Contract"],
      required: [true, "Please enter job type"],
    },
    status: {
      type: String,
      enum: ["Interview", "Rejected", "Pending", "Closed"],
      default: "Pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId, // Here we are assigning a job to the user who created it since user is logged in,
      ref: "User",
      required: [true, "Please login in to create job"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", JobSchema);
