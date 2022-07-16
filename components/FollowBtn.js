import styles from "../styles/components/SpaceInfo.module.scss";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function FollowBtn({space}) {

  const { data: session } = useSession();
  const userId = session ? session.userId : null;
     // follow/unfollow space
  const [following, setFollowing] = useState();
  useEffect(() => {
    if (userId) {
      fetch(`/api/users/getFollowing?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.find((spaceData) => spaceData.id === space.id)) {
            setFollowing(true);
          } else {
            setFollowing(false);
          }
        }
      )
    }
  }, [userId, space.id, following]);

const handleFollow = async (e) => {
    const body = {id : userId, spaceId : space.id }
    try {
      const response = await fetch("/api/users/followSpace", {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });
    if (response.status !== 200){
    } else {
      setFollowing(true);
    }
    } catch (error) {
          }
}
const handleUnfollow = async (e) => {
  const body = {id : userId, spaceId : space.id }
  try {
    const response = await fetch("/api/users/unfollowSpace", {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
  });
  if (response.status !== 200){
  } else {
    setFollowing(false);
  }
  } catch (error) {
      }
}
  return (
    <div>
         {userId && !following ? (
              <p className={styles.spaceFollow}
                  onClick={handleFollow}>
                  + Follow
              </p>
            ) : (
                <p className={styles.spaceUnfollow}
                  onClick={handleUnfollow}>
                    - Unfollow
              </p>
            )}
    </div>
  )
}
