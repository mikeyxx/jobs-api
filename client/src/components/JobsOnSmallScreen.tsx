import { useAppSelector, useAppDispatch } from "../app/store";
import moment from "moment";
import { BiEdit } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getSingleJob,
  setLoading,
  failedResponse,
  getAllJobs,
} from "../features/user/UserSlice";

const JobsOnSmallScreen = () => {
  const { jobs, token } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      dispatch(failedResponse(error.response.data.err._message));
    }
  };

  return (
    <div className="gridProp mt-7 ">
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
          <div
            className="flex flex-col bg-white shadow rounded p-7 text-center leading-8"
            key={id}
          >
            <span>
              <strong>Company:</strong> {company}
            </span>
            <span>
              <strong>Position:</strong> {position}
            </span>
            <span>
              <strong>Job-Type:</strong> {jobType}
            </span>
            <span>
              <strong>Salary:</strong> {salary}
            </span>
            <span>
              <strong>Date:</strong> {date}
            </span>
            <span>
              <strong>Status:</strong> {status}
            </span>
            <span className="flex justify-center mt-6">
              <BiEdit
                onClick={() => fetchSingleJob(id)}
                className="mr-6 cursor-pointer text-green-600 text-2xl"
              />
              <BsTrashFill
                onClick={() => handleDelete(id)}
                className="cursor-pointer text-red-800 text-2xl"
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default JobsOnSmallScreen;
