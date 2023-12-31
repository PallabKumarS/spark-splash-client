import { useContext, useState } from "react";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const [show, setShow] = useState(false);

  const { handleAlert, googleLogIn, logIn, setLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    logIn(email, password)
      .then(() => {
        navigate(location?.state ? location.state : "/");
        handleAlert("success", "User LoggedIn Successfully");
      })
      .catch((error) => {
        handleAlert("error", `${error.message}`);
        setLoading(false);
      });
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then(() => {
        navigate(location?.state ? location.state : "/");
        handleAlert("success", "User LoggedIn Successfully");
      })
      .catch((error) => {
        handleAlert("error", `${error.message}`);
        setLoading(false);
      });
  };

  return (
    <div className="bg-base-200 py-5 md:w-1/2 mx-auto mt-10 relative text-center mb-10 px-3">
      <h2 className="text-3xl mt-5 mb-5 text-lime-500">Please Login Here</h2>

      <form onSubmit={handleLogIn}>
        <input
          className="w-3/4 mb-3 rounded-lg py-2 px-3 bg-black"
          type="email"
          name="email"
          placeholder="Enter a Valid Email"
          required
        />

        <br />
        <input
          className="w-3/4 mb-3 rounded-lg py-2 px-3 bg-black"
          type={show ? "text" : "password"}
          name="password"
          placeholder="Enter a Password"
          required
        />
        <span
          className="z-10 w-fit absolute translate-y-3/4 -translate-x-5"
          onClick={() => setShow(!show)}
        >
          {show ? <BsEyeFill></BsEyeFill> : <BsEyeSlashFill></BsEyeSlashFill>}
        </span>

        <br />
        <input
          className="mb-3 btn btn-active w-3/4 text-lime-700"
          type="submit"
          value="LogIn"
        />
      </form>

      <div className="text-center mx-auto mb-3">
        <p className="mb-2">Or Login Using</p>
        <FcGoogle
          onClick={handleGoogleLogIn}
          className="text-center mx-auto w-10 h-10"
        ></FcGoogle>
      </div>

      <p>
        Do not have an account? <br /> Please{" "}
        <span className="font-semibold italic text-lime-600 ml-2 hover:underline">
          <Link to="/register">Register</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
