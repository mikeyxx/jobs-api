import Jobs from "../components/Jobs";
import Navbar from "../components/Navbar";
import { jobTypeValues } from "../utils/DataType";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  createJob,
  getAllJobs,
  setLoading,
  failedResponse,
} from "../features/user/UserSlice";
import { useEffect } from "react";

const Dashboard = () => {
  const [jobData, setJobData] = useState({
    company: "",
    position: "",
    salary: "",
    jobType: "",
  });
  const dispatch = useAppDispatch();
  const { token, isLoading } = useAppSelector((state) => state.users);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const { company, position, salary, jobType } = jobData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/jobs",
        {
          company,
          position,
          salary,
          jobType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(createJob());
      setJobData({
        ...jobData,
        company: "",
        position: "",
        salary: "",
        jobType: "",
      });
    } catch (error) {
      console.log(error);
      dispatch(failedResponse());
    }
  };

  const fetchJobs = async () => {
    dispatch(setLoading());
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllJobs(data.jobs));
    } catch (error) {
      console.log(error);
      dispatch(failedResponse());
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [isLoading]);

  return (
    <div className="max-w-[1100px] w-full m-auto min-h-screen overflow-hidden">
      <Navbar />
      <div className="w-full bg-white p-5 rounded shadow-sm mt-16">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="company"
              value={jobData.company}
              onChange={handleChange}
              placeholder="Company"
              className="px-4 py-2 text-xl bg-background rounded"
            />
            <input
              type="text"
              name="position"
              value={jobData.position}
              onChange={handleChange}
              placeholder="Position"
              className="px-4 py-2 text-xl bg-background rounded"
            />
            <input
              type="text"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="px-4 py-2 text-xl bg-background rounded"
            />
            <select
              name="jobType"
              value={jobData.jobType}
              onChange={handleChange}
              className="px-4 py-2 text-xl bg-background rounded"
            >
              <option>Enter a Job Type</option>
              {jobTypeValues.map((options, index) => (
                <option key={index}>{options}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-primary px-2 py-2 text-xl text-white rounded transition-all hover:bg-buttonHover mt-4"
          >
            {isLoading ? "Adding new job..." : "Add Job"}
          </button>
        </form>
      </div>
      <Jobs />
    </div>
  );
};

export default Dashboard;
