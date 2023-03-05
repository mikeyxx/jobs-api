import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/store";
import moment from "moment";
import { useState, useEffect } from "react";
import {
  getAllJobs,
  setLoading,
  failedResponse,
  getSingleJob,
} from "../features/user/UserSlice";
import LoadingState from "./LoadingState";
import JobsOnSmallScreen from "./JobsOnSmallScreen";

const Jobs = () => {
  const { jobs, isLoading, token } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [screenSize, setScreenSize] = useState(0);

  const handleDelete = async (id: string) => {
    dispatch(setLoading());
    try {
      const { data } = await axios.delete(`/api/v1/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllJobs(data.jobs));
    } catch (error: any) {
      dispatch(failedResponse(error.msg));
    }
  };

  const fetchSingleJob = async (id: string) => {
    try {
      const { data } = await axios.get(`/api/v1/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getSingleJob(data.job));
      navigate(`/edit/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      {screenSize > 929 ? (
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
                {jobs?.map((job) => {
                  const {
                    _id: id,
                    company,
                    position,
                    jobType,
                    salary,
                    createAt,
                    status,
                  } = job;
                  let date: any = moment(createAt);
                  date = date.format("MMMM Do, YYYY");

                  return (
                    <tr
                      key={id}
                      className="w-full p-4 flex items-center justify-between"
                    >
                      <td>{company}</td>
                      <td>{position}</td>
                      <td>{jobType}</td>
                      <td>{salary}</td>
                      <td>{date}</td>
                      <td className="bg-[#d1e7dd] px-7">
                        <small>{status}</small>
                      </td>
                      <td className="flex">
                        <BiEdit
                          onClick={() => fetchSingleJob(id)}
                          className="mr-2 cursor-pointer text-green-600"
                        />

                        <BsTrashFill
                          onClick={() => handleDelete(id)}
                          className="cursor-pointer text-red-800"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <JobsOnSmallScreen />
      )}
    </>
  );
};

export default Jobs;
