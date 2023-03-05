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
  actionComplete,
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
  const { token, isLoading, success, errMsg } = useAppSelector(
    (state) => state.users
  );

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
        `/api/v1/jobs`,
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
    } catch (error: any) {
      dispatch(failedResponse(error.response.data.err._message));
    }
  };

  const fetchJobs = async () => {
    dispatch(setLoading());
    try {
      const { data } = await axios.get(`/api/v1/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllJobs(data.jobs));
    } catch (error: any) {
      dispatch(failedResponse(error.response.data.err._message));
    }
    dispatch(actionComplete());
  };

  useEffect(() => {
    fetchJobs();
  }, [success]);

  return (
    <div className="max-w-[1100px] w-full m-auto min-h-screen px-7">
      <Navbar />
      <div className="w-full bg-white p-5 rounded shadow-sm mt-16 transition-all">
        <form onSubmit={handleSubmit}>
          <div className="gridProp transition-all">
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
              className="px-4 py-2 text-xl bg-background rounded text-gray-400"
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
        {errMsg ? (
          <span className="bg-red-400 flex justify-center mt-7 p-2 text-white">
            {errMsg}
          </span>
        ) : (
          ""
        )}
      </div>
      <Jobs />
    </div>
  );
};

export default Dashboard;
