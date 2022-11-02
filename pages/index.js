import { Fragment } from "react";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";
import { connectMongoDB } from "../database/connect";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <meta
          name="description"
          content="A curated list of meetups for developers across the globe."
        />
        <title>React Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await connectMongoDB();

  const db = client.db("meetups");

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray(); // select * from meetups

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

/*
export default function Home(props) {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    setMeetups(DUMMY_MEETUPS);
  }, []);

  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  // write secured server side code here
  // fetch data from an API or DB
  // read data from a filesystem
  // Will be evaluated before the component. Forces nextJS to wait for data fetching before pre-rendering (generate HTML code)

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10, // update HTML code at intervals after deployment
  };
}

// export async function getServerSideProps(context) {
//   // runs on the server after deployment on every request
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
*/
