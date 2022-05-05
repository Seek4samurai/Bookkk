import React, { useState } from "react";
import { Link } from "react-router-dom";
import { account } from "../services/appwriteConfig";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await account.create(
        userDetails.name,
        userDetails.email,
        userDetails.password
      );
      await account.createSession(userDetails.email, userDetails.password);
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
        <h3 className="mt-5 text-center fs-1">Sign up</h3>
        <form className="container">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  name: e.target.value,
                });
              }}
              type="text"
              className="form-control"
              id="name"
              aria-describedby="name"
              name="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
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
              className="form-control"
              id="email"
              aria-describedby="email"
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
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
              className="form-control"
              id="password"
              name="password"
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              onClick={(e) => handleSignUp(e)}
              type="submit"
              className="btn btn-success btn-lg"
            >
              Signup
            </button>
          </div>
          <div className="mb-3">
            <span>Already have an account ? </span>{" "}
            <Link to="/login">
              <button className="btn btn-outline-primary">Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
