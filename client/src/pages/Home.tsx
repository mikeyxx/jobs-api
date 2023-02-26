import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import main from "../assets/main.svg";

const Home = () => {
  return (
    <div className="max-w-[1100px] w-full m-auto min-[931px]:max-h-screen max-[930px]:min-h-screen overflow-hidden p-7">
      <nav>
        <img src={logo} alt="" />
      </nav>
      <div className="flex h-screen max-[930px]:h-full items-center justify-center gap-36 max-[1127px]:gap-12 max-[1127px]:flex-col-reverse max-[930px]:mt-10">
        <div className="w-1/2 max-[1127px]:w-full max-[1127px]:text-center">
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
            <button className="bg-primary px-4 py-2 mt-12 text-2xl text-white rounded transition-all hover:bg-buttonHover shadow-md">
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
