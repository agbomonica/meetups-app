import { useRouter } from "next/router";

import Card from "../ui/Card";
import styles from "./MeetupItem.module.css";

function MeetupItem(props) {
  const router = useRouter();

  const showMeetupDetailsHandler = () => {
    router.push("/" + props.id);
  };

  return (
    <li className={styles.item}>
      <Card>
        <div className={styles.image}>
          <picture>
            <source srcSet={props.image} />
            <img src={props.image} alt={props.title} />
          </picture>
        </div>
        <div className={styles.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={styles.actions}>
          {/*could have used Link */}
          <button onClick={showMeetupDetailsHandler}>Show Details</button>{" "}
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
