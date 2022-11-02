import { MongoClient } from "mongodb";

const MONGO_URL =
  "mongodb+srv://monique:TyGk4cbyjj2ktSQ4@cluster0.8hdvo2t.mongodb.net/?retryWrites=true&w=majority";

export const connectMongoDB = async function () {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();

    console.log("connected");

    return client;
  } catch (err) {
    return Promise.reject(err);
  }
};
