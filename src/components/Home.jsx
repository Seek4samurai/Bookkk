import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebaseConfig";
import Post from "./Post";

const Home = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState();
  const [userInput, setUserInput] = useState({
    postId: "",
    user: "",
    message: "",
    description: "",
    upvotes: 0,
    downvotes: 0,
  });

  // Getting active user --------------------------------------------------
  const fetchUser = async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserDetails(user);
        setUserInput((prev) => {
          return {
            ...prev,
            user: user.uid,
          };
        });
      } else {
        navigate("/");
      }
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogOut = async (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      navigate("/");
    });
  };

  // Posting data --------------------------------------------------
  const handlePost = async (e) => {
    e.preventDefault();
    await db.collection("posts").add(userInput);
    window.location.reload();
  };

  if (userDetails) {
    return (
      <div className="container-xxl border border-2 rounded p-2 my-4">
        <h3 className="text-center">Bookk</h3>
        <h6 className="d-flex justify-content-end">
          Welcome, {userDetails.uid}
        </h6>
        <div className="d-flex justify-content-end align-items-center">
          <button
            onClick={(e) => handleLogOut(e)}
            className="btn btn-danger mx-1"
          >
            Logout
          </button>
        </div>

        {/* User's field here ----- */}
        <div className="p-3 ">
          <form>
            {/* Heading */}
            <label htmlFor="inputfield" className="form-label fs-2 fw-bold">
              What's on your mind?
            </label>
            <input
              onChange={(e) => {
                setUserInput({
                  ...userInput,
                  message: e.target.value,
                });
              }}
              id="inputfield"
              className="form-control p-2 mt-2 mb-2"
            ></input>

            {/* Description */}
            <label htmlFor="inputfieldDesc" className="form-label fs-5">
              Enter description
            </label>
            <textarea
              onChange={(e) => {
                setUserInput({
                  ...userInput,
                  description: e.target.value,
                });
              }}
              id="inputfieldDesc"
              className="form-control p-2 mt-2 mb-2 "
            ></textarea>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                handlePost(e);
              }}
            >
              Post
            </button>
          </form>
        </div>

        {/* All Posts here ----- */}
        <div className="flex justify-center m-3">
          <Post></Post>
        </div>
      </div>
    );
  } else {
    // asking to login if no user logged in
    return (
      <div className="flex text-center">
        <h2 className="text-center my-3">Loading user data...</h2>
        {/* <button className="btn btn-dark" onClick={() => navigate("/")}>
          Login
        </button> */}
      </div>
    );
  }
};

export default Home;
