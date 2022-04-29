import React, { useEffect, useState } from "react";
import { db } from "../../services/appwriteConfig";
import { FaArrowUp } from "react-icons/fa/";
import { FaArrowDown } from "react-icons/fa/";

const Post = () => {
  const [documents, setDocuments] = useState();

  // Getting all documents
  const getDocument = async () => {
    try {
      const res = await db.listDocuments(process.env.REACT_APP_COLLECTION_ID);
      setDocuments(res.documents);
      // res.documents.forEach((objects) => {
      //   console.log(objects.$id);
      // });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocument();
  }, [documents]);

  return (
    <div>
      {documents &&
        documents.map((doc) => {
          return (
            <div className="m-2 p-2 border">
              <h3>{doc.message}</h3>
              <p>Hello world</p>
              <button className="btn btn-outline-primary mx-2">
                <FaArrowUp></FaArrowUp>
              </button>
              <button className="btn btn-outline-danger">
                <FaArrowDown></FaArrowDown>
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Post;
