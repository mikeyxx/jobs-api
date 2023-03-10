import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  registerUser,
  setLoading,
  failedResponse,
} from "../features/user/UserSlice";

interface Props {
  setIsMember: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = ({ setIsMember }: Props) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { user, isLoading, errMsg } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const { name, email, password } = newUser;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      const { data } = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
      });
      dispatch(registerUser({ user: data.user.name }));
    } catch (error: any) {
      dispatch(failedResponse(error.response.data.err._message));
    }
    setNewUser({
      ...newUser,
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-7">
      <div className="max-w-lg m-auto bg-white p-8 w-full shadow-lg rounded border-t-[5px] border-t-primary">
        <div className="flex flex-col items-center">
          <img src={logo} alt="" />
          <h2 className="font-0 font-title2 mt-5 text-xl">Register</h2>
        </div>

        <form className="mt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col ">
            <label className="mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              required
              name="name"
              className="bg-background rounded p-1"
              value={newUser.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              className="bg-background rounded p-1"
              value={newUser.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              minLength={6}
              required
              name="password"
              className="bg-background rounded p-1"
              value={newUser.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-primary transition-all hover:bg-buttonHover text-white w-full rounded mt-9 p-1"
          >
            {isLoading ? "Adding User..." : "Submit"}
          </button>
        </form>

        <span className="text-red-600 flex justify-center mt-7 ">{errMsg}</span>
        {user && (
          <span className="text-green-500 flex justify-center mt-7">
            User created! Please login in
          </span>
        )}
        <p className="text-center mt-6">
          Already a member?{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => setIsMember((pre) => !pre)}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
