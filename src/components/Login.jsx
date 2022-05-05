import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { account } from "../services/appwriteConfig";

const Login = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await account.createSession(userDetails.email, userDetails.password);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="mt-5 text-center fw-light fs-1">
        Bookkk - an internet's opinionator
      </h2>
      <p className="text-center fw-light fs-6">
        Free, Open source and anonymous
      </p>
      <div className="border border-2 rounded-3 m-4 p-4">
        <h3 className="mt-5 text-center fs-1">Login</h3>
        <form className="container">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  email: e.target.value,
                });
              }}
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  password: e.target.value,
                });
              }}
              type="password"
              name="password"
              required
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              onClick={(e) => handleSignIn(e)}
              type="submit"
              className="btn btn-success btn-lg"
            >
              Login
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <div className="mb-3">
              <span>First time here ? </span>
              <Link to="/signup">
                <button className="btn btn-outline-primary mx-1">Signup</button>
              </Link>
            </div>
            <div>
              <span>Forget password ? </span>
              <Link to="/forget-password">
                <button className="btn btn-outline-danger mx-1">
                  Forget Password
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
