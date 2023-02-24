import { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
const Auth = () => {
  const [isMember, setIsMember] = useState(false);
  return (
    <>
      {isMember ? (
        <Login setIsMember={setIsMember} />
      ) : (
        <Register setIsMember={setIsMember} />
      )}
    </>
  );
};

export default Auth;
