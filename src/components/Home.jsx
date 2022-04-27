import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../services/appwriteConfig";

const Home = () => {
  const [userDetails, setUserDetails] = useState();
  const navigate = useNavigate();

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
      console.log(error.message);
    }
  };

  if (userDetails) {
    return (
      <div className="container-xxl border mt-5 p-3">
        <h3 className="text-center"> Super Auth </h3>
        <h6 className="d-flex justify-content-end">
          {/* Welcome, {userDetails.name} */}
        </h6>
        <div className="d-flex justify-content-end align-items-center">
          <button
            onClick={(e) => handleLogOut(e)}
            className="btn btn-danger mx-1"
          >
            Logout
          </button>
        </div>

        <div className="flex justify-center m-2">
          <div className="flex border p-3">
            <h2>Content Heading</h2>
            <p>Content Paragraph</p>
            <button>Upvote</button>
            <button>Downvote</button>
          </div>
        </div>
      </div>
    );
  } else {
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
