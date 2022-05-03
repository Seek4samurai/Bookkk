import { Appwrite } from "appwrite";

const sdk = new Appwrite();

sdk
  .setEndpoint(process.env.REACT_APP_API_ENDPOINT)
  .setProject(process.env.REACT_APP_PROJECT_ID);

export const account = sdk.account;
export const db = sdk.database;
