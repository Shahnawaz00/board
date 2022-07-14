import styles from '../styles/components/DiscoverSpaces.module.scss'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import FollowBtn from './FollowBtn';

const DiscoverSpaces = () => {

  // fetch disovered spaces from database
  const [spaces, setSpaces] = useState([]);
  const { data: session } = useSession();
  const userId = session ? session.userId : null;
  useEffect(() => {
    if (userId) {
      fetch(`${server}/api/users/getDiscover?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          setSpaces(data);
        }
      )
    }
  }, [userId]);

  return (
    <div className={styles.discoverMain} >
      { userId ? (
        spaces.length !== 0 ? spaces.map(space => ( // map through the spaces array
        <div className={styles.discoverEach} key={space.id}>
            <div className={styles.discover1} >
            <div className={styles.discoverHead}>
                <p className={styles.spaceName} >
                  <Link  href='/space/[id]' as={`/space/${space.id}`} >
                    {space.name}
                  </Link>
                </p>
                <FollowBtn space={space} />
            </div>
            <p className={styles.spaceDescription} > {space.description} </p>
            </div>
        </div>
        )) : <p className={styles.emptyMessage} >Wow, you follow every spaces! </p>)
        : <p className={styles.emptyMessage} >Sign in to discover spaces.</p>
      }


  </div>
  )
}

export default DiscoverSpaces
