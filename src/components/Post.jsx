import React, { useEffect, useState } from "react";
import { auth, db } from "../lib/firebaseConfig";
import { FaArrowUp, FaArrowDown } from "react-icons/fa/";

function Post() {
  const [currentUser, setCurrentUser] = useState();
  const [upvotes, setUpvotes] = useState();
  const [downvotes, setDownvotes] = useState();
  const [mappableData, setMappableData] = useState([]);

  // Getting active user --------------------------------------------------
  const fetchUser = async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  // Getting posts --------------------------------------------------------
  const fetchFeed = async () => {
    let collectionSnapshot = (await db.collection("posts")).get();
    let collectionData = (await collectionSnapshot).docs.map((doc) => {
      return [doc.id, doc.data()];
    });

    setMappableData(collectionData);
  };

  const upvote = async () => {};

  const downvote = async () => {};

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <>
      <div>
        <h3>Recent activity...</h3>
        {mappableData.map((entry, idx) => {
          return (
            <>
              <div key={idx} className="m-2 p-2 border rounded">
                <h4 className="text-break">{entry[1].message}</h4>
                <p className="text-break">{entry[1].description}</p>

                <div className="d-flex justify-content-between">
                  {/* <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-primary mx-2"
                      onClick={() => upvote(entry)}
                    >
                      <FaArrowUp></FaArrowUp>
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => downvote(entry, idx)}
                    >
                      <FaArrowDown></FaArrowDown>
                    </button>
                  </div> */}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Post;
