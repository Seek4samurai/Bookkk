import { Appwrite } from "appwrite";

const sdk = new Appwrite();

sdk
  .setEndpoint("http://localhost/signup/v1")
  .setProject(process.env.REACT_APP_PROJECT_ID);

export const account = sdk.account;
