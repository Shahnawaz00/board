import styles from "../styles/components/SpaceInfo.module.scss";
import { useState, useEffect } from "react";
import FollowBtn from "./FollowBtn";

const SpaceInfo = ({ space }) => {

  // fetch followers and discussions count from the database and display them
  const [followersCount, setFollowersCount] = useState(0);              // number of followers
  const [discussionsCount, setDiscussionsCount] = useState(0);          // number of discussions
  useEffect(() => {
    // fetch number of followers by querying with spaceId
    fetch(`/api/spaces/getFollowers?spaceId=${space.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFollowersCount(data.length);                  // set number of followers
      }
    );
    // fetch number of discussions by querying with spaceId
    fetch(`/api/spaces/getDiscussions?spaceId=${space.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDiscussionsCount(data.length);              // set number of discussions
      }
    );
  }, [space.id]);

  return (
    <div className={styles.spaceInfo} >
        <div className={styles.infoHeader} >
            <h3>{space.name} </h3>
            <FollowBtn space={space} />
        </div>
         <p className={styles.description} >{space.description}</p>
        <p>Followers: {followersCount} </p>
        <p>Discussions: {discussionsCount} </p>
    </div>
  )
}

export default SpaceInfo
