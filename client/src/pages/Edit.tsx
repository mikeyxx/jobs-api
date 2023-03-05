import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/store";
import { jobStatusValues, jobTypeValues } from "../utils/DataType";
import axios from "axios";
import {
  failedResponse,
  setLoading,
  updateJob,
} from "../features/user/UserSlice";

const Edit = () => {
  const [editValue, setEditValue] = useState({
    company: "",
    position: "",
    salary: "",
    jobType: "",
    status: "",
  });
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setEditValue({
      ...editValue,
      [name]: value,
    });
  };

  const { editItem, token, isLoading } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (editItem) {
      const { company, position, salary, jobType, status } = editItem;
      setEditValue({
        company,
        position,
        salary,
        jobType,
        status,
      });
    }
  }, [editItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading());
    const { company, position, salary, jobType, status } = editValue;

    try {
      const { data } = await axios.patch(
        `/api/v1/jobs/${id}`,
        {
          company,
          position,
          salary,
          jobType,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateJob(data.job));
    } catch (error: any) {
      dispatch(failedResponse(error.response.data.err._message));
    }
  };

  return (
    <div className="max-w-[1100px] w-full m-auto min-h-screen px-6">
      <Navbar />
      <Link to="/dashboard">
        <button className="bg-black text-white mt-16 w-48 rounded p-1">
          Back Home
        </button>
      </Link>
      <div className="w-full bg-white p-5 rounded shadow-sm mt-6">
        <h3 className="text-2xl font-0 font-title2 mt-10 mb-6 transition-all">
          Update Job
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="gridProp transition-all">
            <div className="flex flex-col">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                name="company"
                value={editValue.company}
                onChange={handleChange}
                className="px-2 py-2 text-xl bg-background rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                name="position"
                onChange={handleChange}
                value={editValue.position}
                className="px-2 py-2 text-xl bg-background rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                name="salary"
                onChange={handleChange}
                value={editValue.salary}
                className="px-2 py-2 text-xl bg-background rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="jobType">Job Type</label>
              <select
                value={editValue.jobType}
                name="jobType"
                onChange={handleChange}
                className="px-2 py-2 text-xl bg-background rounded"
              >
                {jobTypeValues.map((options, index) => (
                  <option key={index}>{options}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="status">Status</label>
              <select
                value={editValue.status}
                name="status"
                onChange={handleChange}
                className="px-2 py-2 text-xl bg-background rounded"
              >
                {jobStatusValues.map((options, index) => (
                  <option key={index}>{options}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary px-8 py-2 text-2xl text-white rounded transition-all hover:bg-buttonHover mt-4"
          >
            {isLoading ? "Updating user information" : "Edit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
