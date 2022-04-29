import React, { useEffect, useState } from "react";
import { account, db } from "../../services/appwriteConfig";
import { FaArrowUp, FaArrowDown } from "react-icons/fa/";

const Post = () => {
  const [userDetails, setUserDetails] = useState();
  const [documents, setDocuments] = useState();
  const [upvote, setUpvote] = useState();
  const [downvote, setDownvote] = useState();

  // Getting all documents -----------------------------------------------------------------------------------
  const getDocument = async () => {
    try {
      const res = await db.listDocuments(process.env.REACT_APP_COLLECTION_ID);
      setDocuments(res.documents);
    } catch (error) {
      console.log(error);
    }
  };

  // const totalUpvotes = documents.map((doc) => {
  //   return doc.$id;
  // });

  // User's info -----------------------------------------------------------------------------------
  const fetchUser = async () => {
    try {
      const data = await account.get();
      setUserDetails(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userDetails]);

  // Upvotes and Downvotes -----------------------------------------------------------------------------------
  const handleUpvotes = async (doc) => {
    console.log(documents);
    const upvotedBy = await db.getDocument(
      process.env.REACT_APP_COLLECTION_ID,
      doc.$id
    );

    // pushing the user id of users that upvotes the post
    const upvotedByArray = upvotedBy.upvotedBy;
    Array.prototype.push.apply(upvotedByArray, [userDetails.$id]);

    // updating the document on database
    await db.updateDocument(process.env.REACT_APP_COLLECTION_ID, doc.$id, {
      upvotedBy: upvotedByArray,
    });
  };

  // Re-rendering Post component when data or votes changes
  useEffect(() => {
    getDocument();
  }, [documents, upvote, downvote]);

  return (
    <div>
      {documents &&
        documents.map((doc) => {
          return (
            <div className="m-2 p-2 border rounded">
              <h3 className="text-break">{doc.message}</h3>
              <p className="text-break">{doc.description}</p>
              <div className="d-flex">
                <button
                  className="btn btn-outline-primary mx-2 d-flex align-items-center"
                  onClick={() => handleUpvotes(doc)}
                >
                  <FaArrowUp></FaArrowUp>
                  <span className="mx-1">{doc.upvotedBy.length}</span>
                </button>
                <button
                  className="btn btn-outline-danger"
                  // onClick={() => handleDownvotes(doc)}
                >
                  <FaArrowDown></FaArrowDown>
                  {doc.downvotes === 0 ? (
                    <span className="mx-1">{doc.downvotes}</span>
                  ) : (
                    <span className="mx-1">-{doc.downvotes}</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Post;
