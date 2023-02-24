import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/store";
import {
  getAllJobs,
  setLoading,
  failedResponse,
  getSingleJob,
} from "../features/user/UserSlice";
import LoadingState from "./LoadingState";

const Jobs = () => {
  const { jobs, isLoading, token } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    dispatch(setLoading());
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getAllJobs(data.jobs));
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(failedResponse());
    }
  };

  const fetchSingleJob = async (id: string) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getSingleJob(data.job));
      navigate(`/edit/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : (
        <div className="mt-16">
          {jobs?.length < 1 ? (
            <p className="font-0 font-title2 text-center">
              Currently, you have no job(s) to display
            </p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#e2e8f0] text-[#64748b]">
                <tr className="w-full p-4 flex items-center justify-between">
                  <th>Company</th>
                  <th>Position</th>
                  <th>Job Type</th>
                  <th>Salary</th>
                  <th>Date Created</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs?.map((job) => (
                  <tr
                    key={job._id}
                    className="w-full p-4 flex items-center justify-between"
                  >
                    <td>{job.company}</td>
                    <td>{job.position}</td>
                    <td>{job.jobType}</td>
                    <td>{job.salary}</td>
                    <td>{job.createAt}</td>
                    <td className="bg-[#d1e7dd] px-7">
                      <small>Pending</small>
                    </td>
                    <td className="flex">
                      <BiEdit
                        onClick={() => fetchSingleJob(job._id)}
                        className="mr-2 cursor-pointer text-green-600"
                      />

                      <BsTrashFill
                        onClick={() => handleDelete(job._id)}
                        className="cursor-pointer text-red-800"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default Jobs;
