// Endpoint: www.domain/api/new-meetup
import { connectMongoDB } from "../../database/connect";

const handler = async function (req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await connectMongoDB();

    const db = client.db("meetups");

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "meetup inserted!" });
  }
};

export default handler;
