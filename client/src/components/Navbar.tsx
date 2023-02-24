import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { RxAvatar } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../app/store";
import { logout } from "../features/user/UserSlice";

const Navbar = () => {
  const user = useAppSelector((state) => state.users.user);
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  console.log(user);

  const handleMenu = () => {
    setShow((pre) => !pre);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    handleMenu();
  };
  return (
    <nav className="pt-5 flex items-center justify-between w-full cursor-pointer">
      <img src={logo} alt="" />
      <div>
        <div
          className="flex items-center bg-primary text-white rounded shadow-md px-4 py-1 justify-center"
          onClick={handleMenu}
        >
          <RxAvatar />
          <span className="mx-2 font-0">{user}</span>
          <IoMdArrowDropdown />
        </div>
        {show && (
          <span
            onClick={handleLogout}
            className="bg-white inline-block w-32 rounded shadow-sm px-4 py-1 text-center mt-4 text-primary font-0 absolute"
          >
            Logout
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
