import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account, db } from "../services/appwriteConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Post from "./subcomponents/Post";

const Home = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [userInput, setUserInput] = useState({
    user: "",
    message: "",
    description: "",
    upvotes: 0,
    downvotes: 0,
  });

  // Getting active user --------------------------------------------------
  const fetchUser = async () => {
    try {
      const data = await account.get();
      setUserDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userDetails]);

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await account.deleteSession(`current`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Posting data --------------------------------------------------
  const handlePost = async (e) => {
    e.preventDefault();
    const currentDate = Date().toString();
    try {
      await db.createDocument(process.env.REACT_APP_COLLECTION_ID, "unique()", {
        ...userInput,
        user: userDetails.$id,
        date: currentDate,
      });
      document.getElementById("inputfield").value = "";
      document.getElementById("inputfieldDesc").value = "";
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (userDetails) {
    return (
      <div className="container-xxl border mt-5 p-3">
        <h3 className="text-center">Bookk</h3>
        <h6 className="d-flex justify-content-end">
          Welcome, {userDetails.$id}
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
              onClick={(e) => handlePost(e)}
            >
              Post
            </button>
          </form>
        </div>

        {/* All Posts here ----- */}
        <div className="flex justify-center m-2">
          <Post></Post>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  } else {
    // asking to login if no user logged in
    return (
      <div className="flex text-center">
        <h2 className="text-center my-3">
          Please login first to see the homepage
        </h2>
        <button className="btn btn-dark" onClick={() => navigate("/")}>
          Login
        </button>
      </div>
    );
  }
};

export default Home;
