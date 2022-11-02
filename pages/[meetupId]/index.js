import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ObjectId } from "mongodb";

import { connectMongoDB } from "../../database/connect";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  const router = useRouter();
  console.log(router);

  return (
    <Fragment>
      <Head>
        <meta name="description" content={props.meetupData.description} />
        <title>{props.meetupData.title}</title>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await connectMongoDB();
  const db = client.db("meetups");
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // select id from meetups
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => {
      return { params: { meetupId: meetup._id.toString() } };
    }),

    // paths: [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  // fetch single meetup...

  const meetupId = context.params.meetupId;

  const client = await connectMongoDB();

  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetups");

  // select * from meetups where id == meetupId
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetails;
