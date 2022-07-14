import styles from "../styles/Following.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import FollowBtn from "../components/FollowBtn";
import Head from 'next/head';
import { server } from '../config';

export default function Following() {

  //fetch followed spaces from database
  const [following, setFollowing] = useState([]);
  const { data: session } = useSession();
  const userId = session ? session.userId : null;
  useEffect(() => {
    if (userId) {
      fetch(`${server}/api/users/getFollowing?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          setFollowing(data);
        }
      )
    }
  }, [userId]);

    return (
      <div className={styles.following} >
        <Head>
          <title>Following</title>
          <meta name={'following'} content={'following'} />
        </Head>
          <h1>Following</h1>
        { userId ? (
          following.length !== 0 ? following.map(space => (
            <div className={styles.eachSpace} key={space.id}>
                <div className={styles.eachSpaceHead}>
                    <p className={styles.spaceName} >
                     <Link  href='/space/[id]' as={`/space/${space.id}`} >
                      {space.name}
                     </Link>
                    </p>
                    <FollowBtn space={space} />
                </div>
                <p className={styles.spaceDescription} > {space.description} </p>
            </div>
          )) : <p className={styles.emptyMessage} >You dont follow any spaces yet, go discover! </p>)
         : <p className={styles.emptyMessage} >Sign in to follow spaces! </p>
        }



    </div>
  )
}
