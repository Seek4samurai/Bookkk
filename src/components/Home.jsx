import React, { useEffect, useState } from "react";
import { account } from "../services/appwriteConfig";

const Home = () => {
  const [userDetails, setUserDetails] = useState();
  useEffect(async () => {
    try {
      const data = await account.get();
      setUserDetails(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="container-xxl border mt-5 p-3">
      <h3 className="text-center"> Super Auth </h3>
      <h6 className="d-flex justify-content-end">Welcome, Username </h6>
      <div className="d-flex justify-content-end align-items-center">
        <button className="btn btn-danger mx-1">Logout</button>
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
};

export default Home;
