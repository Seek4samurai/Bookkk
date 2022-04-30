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
    setUpvote(true);
    const downVote = documents.downvote;
    const upVote = documents.upvote;

    const upvotedBy = await db.getDocument(
      process.env.REACT_APP_COLLECTION_ID,
      doc.$id
    );
    const downvotedBy = await db.getDocument(
      process.env.REACT_APP_COLLECTION_ID,
      doc.$id
    );

    // check if user liked this already or not
    if (doc.upvotedBy.includes(userDetails.$id) === true) {
      const upvotedByArray = upvotedBy.upvotedBy;
      // filtering array - removing the current user's id from upvotedBy array
      var filteredArray = upvotedByArray.filter((e) => e !== userDetails.$id);

      // updating the document on database
      await db.updateDocument(process.env.REACT_APP_COLLECTION_ID, doc.$id, {
        upvotedBy: filteredArray,
        upvotes: upVote - 1,
      });
    }

    if (doc.upvotedBy.includes(userDetails.$id) === false) {
      setDownvote(false); // upvoting means removing downvote from the post
      // pushing the user id of users that upvotes the post
      const upvotedByArray = upvotedBy.upvotedBy;
      Array.prototype.push.apply(upvotedByArray, [userDetails.$id]);

      // updating the document on database
      await db.updateDocument(process.env.REACT_APP_COLLECTION_ID, doc.$id, {
        upvotedBy: upvotedByArray,
        upvotes: upVote + 1,
      });

      // removing downvote if user downvotes a post
      const downvotedByArray = downvotedBy.downvotedBy;
      // filtering array - removing the current user's id from downvotedBy array
      var newFilteredArray = downvotedByArray.filter(
        (e) => e !== userDetails.$id
      );

      // updating the document on database
      await db.updateDocument(process.env.REACT_APP_COLLECTION_ID, doc.$id, {
        downvotedBy: newFilteredArray,
        downvotes: downVote - 1,
      });
    }
  };

  const handleDownvotes = async (doc) => {
    setDownvote(true);
    const upVote = documents.upvote;
    const downVote = documents.downvote;

    const upvotedBy = await db.getDocument(
      process.env.REACT_APP_COLLECTION_ID,
      doc.$id
    );
    const downvotedBy = await db.getDocument(
      process.env.REACT_APP_COLLECTION_ID,
      doc.$id
    );

    // check if user disliked this already or not
    if (doc.downvotedBy.includes(userDetails.$id) === true) {
      const downvotedByArray = downvotedBy.downvotedBy;
      // filtering array - removing the current user's id from downvotedBy array
      var filteredArray = downvotedByArray.filter((e) => e !== userDetails.$id);

      // updating the document on database
      await db.updateDocument(process.env.REACT_APP_COLLECTION_ID, doc.$id, {
        downvotedBy: filteredArray,
        downvotes: downVote - 1,
      });
    }

    if (doc.downvotedBy.includes(userDetails.$id) === false) {
      setUpvote(false); // downvoting means removing upvote from the post
      // pushing the user id of users that downvotes the post
      const downvotedByArray = downvotedBy.downvotedBy;
      Array.prototype.push.apply(downvotedByArray, [userDetails.$id]);

      // updating the document on database
      await db.updateDocument(process.env.REACT_APP_COLLECTION_ID, doc.$id, {
        downvotedBy: downvotedByArray,
        downvotes: downVote + 1,
      });

      // removing upvote if user downvotes a post
      const upvotedByArray = upvotedBy.upvotedBy;
      // filtering array - removing the current user's id from upvotedBy array
      var newFilteredArray = upvotedByArray.filter(
        (e) => e !== userDetails.$id
      );

      // updating the document on database
      await db.updateDocument(process.env.REACT_APP_COLLECTION_ID, doc.$id, {
        upvotedBy: newFilteredArray,
        upvotes: upVote - 1,
      });
    }
  };

  // Re-rendering Post component when data or votes changes--------------------------------------------------
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
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-primary mx-2"
                    onClick={() => handleUpvotes(doc)}
                  >
                    <FaArrowUp></FaArrowUp>
                    <span className="mx-1">{doc.upvotedBy.length}</span>
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDownvotes(doc)}
                  >
                    <FaArrowDown></FaArrowDown>
                    {doc.downvotedBy.length === 0 ? (
                      <span className="mx-1">{doc.downvotedBy.length}</span>
                    ) : (
                      <span className="mx-1">-{doc.downvotedBy.length}</span>
                    )}
                  </button>
                </div>
                <p className="m-2 d-flex ">{doc.date}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Post;
