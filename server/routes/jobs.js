const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
} = require("../controller/job");

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
