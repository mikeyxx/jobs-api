import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Edit = () => {
  return (
    <div className="max-w-[1100px] w-full m-auto max-h-screen overflow-hidden">
      <Navbar />
      <Link to="/dashboard">
        <button className="bg-black text-white mt-16 w-48 rounded p-1">
          Back Home
        </button>
      </Link>
      <div className="w-full bg-white p-5 rounded shadow-sm mt-6">
        <h3 className="text-2xl font-0 font-title2 mt-16 mb-6">Update Job</h3>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                className="px-2 py-2 text-xl bg-background rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="company">Position</label>
              <input
                type="text"
                className="px-2 py-2 text-xl bg-background rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="company">Salary</label>
              <input
                type="text"
                className="px-2 py-2 text-xl bg-background rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="company">Job Type</label>
              <select className="px-2 py-2 text-xl bg-background rounded">
                <option>Job Type</option>
                <option>Intern</option>
                <option>Permanent</option>
                <option>Contract</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary px-8 py-2 text-2xl text-white rounded transition-all hover:bg-buttonHover mt-4"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
