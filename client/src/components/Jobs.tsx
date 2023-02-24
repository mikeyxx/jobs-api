import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/store";
import {
  getAllJobs,
  setLoading,
  failedResponse,
} from "../features/user/UserSlice";
import LoadingState from "./LoadingState";

const Jobs = () => {
  const { jobs, isLoading, token } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

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
                      <Link to={`/edit/${job._id}`}>
                        <BiEdit className="mr-2 cursor-pointer text-green-600" />
                      </Link>
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
