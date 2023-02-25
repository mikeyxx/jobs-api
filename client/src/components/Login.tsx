import { useState } from "react";
import logo from "../assets/logo.svg";
import { useAppDispatch, useAppSelector } from "../app/store";
import axios from "axios";
import {
  loginUser,
  setLoading,
  failedResponse,
} from "../features/user/UserSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  setIsMember: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setIsMember }: Props) => {
  const { isLoading } = useAppSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const { email, password } = userDetails;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_LOGIN_API}`,
        { email, password }
      );
      dispatch(loginUser({ user: data.user.name, token: data.token }));
      localStorage.setItem(
        "user",
        JSON.stringify({ user: data.user.name, token: data.token })
      );
      if (data.token !== null) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      dispatch(failedResponse());
    }
    setUserDetails({
      ...userDetails,
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-7">
      <div className="max-w-lg m-auto bg-white p-8 w-full shadow-lg rounded border-t-[5px] border-t-primary">
        <div className="flex flex-col items-center">
          <img src={logo} alt="" />
          <h2 className="font-0 font-title2 mt-5 text-xl">Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-2">
          <div className="flex flex-col mt-2">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              className="bg-background rounded p-1"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="text"
              name="password"
              value={userDetails.password}
              onChange={handleChange}
              className="bg-background rounded p-1"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-buttonHover transition-all text-white w-full rounded mt-6 p-1"
          >
            {isLoading ? "Fetching User Data..." : "Submit"}
          </button>
        </form>
        <p className="text-center mt-6">
          Not yet a member?{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => setIsMember((pre) => !pre)}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
