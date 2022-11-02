import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";
import { connectMongoDB } from "../database/connect";

export default function Home(props) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="A curated list of meetups for developers across the globe."
        />
        <title>React Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await connectMongoDB();

  const db = client.db("meetups");

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          id: meetup._id.toString(),
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
        };
      }),
    },
    revalidate: 1,
  };
}
