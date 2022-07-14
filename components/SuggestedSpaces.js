import { useState, useEffect } from 'react'
import styles from '../styles/components/SuggestedSpaces.module.scss'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import SpacesList from './SpacesList';

export default function SuggestedSpaces() {

  //fetch suggested spaces from database
  const [suggestedSpaces, setSuggestedSpaces] = useState([]);
  const { data: session } = useSession();
  const userId = session ? session.userId : null;
  useEffect(() => {
    if (userId) {
      fetch(`api/users/getDiscover?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          setSuggestedSpaces(data);
        }
      )
    }
  }, [userId]);

  return (
    <div>
        <div className={styles.suggestedFollows} >
              <h3 className={styles.suggestedTitle} >Suggested Follows</h3>
            {suggestedSpaces.length !== 0 ? <SpacesList spaces={suggestedSpaces} />
            : <p className={styles.emptyMessage} >No spaces to suggest.</p>}
        </div>
    </div>
  )
}
