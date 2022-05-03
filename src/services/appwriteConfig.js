import { Appwrite } from "appwrite";

const sdk = new Appwrite();

sdk
  .setEndpoint("https://localhost/v1")
  .setProject(process.env.REACT_APP_PROJECT_ID);

export const account = sdk.account;
export const db = sdk.database;
