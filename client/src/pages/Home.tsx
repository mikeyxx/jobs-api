import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import main from "../assets/main.svg";

const Home = () => {
  return (
    <div className="max-w-[1100px] w-full m-auto max-h-screen overflow-hidden">
      <nav className="pt-5">
        <img src={logo} alt="" />
      </nav>
      <div className="flex h-screen items-center justify-center gap-36">
        <div className="w-1/2">
          <h1 className="font-title1 font-0 text-5xl mb-10">
            Job Tracking App
          </h1>
          <p>
            Jobio is a job tracking application designed to help individuals and
            organizations keep track of job applications and hiring processes.
            It allows users to log job applications, track the status of each
            application, and set reminders for follow-up tasks such as sending
            thank-you notes, scheduling interviews, and checking on application
            status.
          </p>
          <Link to="/register">
            <button className="bg-primary px-4 py-2 mt-5 text-2xl text-white rounded transition-all hover:bg-buttonHover shadow-md">
              Login / Register
            </button>
          </Link>
        </div>
        <img src={main} alt="" className="w-[40%]" />
      </div>
    </div>
  );
};

export default Home;
