import Link from 'next/link';
import React from 'react'
import styles from '../styles/components/SuggestedSpaces.module.scss'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function SpacesList({ spaces }) {


    const { data: session } = useSession();
    const userId = session ? session.userId : null;

    const [spaceId, setSpaceId] = useState('')
  useEffect(() => {
    if (spaceId !== '') {
        const handleFollow = async (e) => {
            const body = {id : userId, spaceId }
            try {
              const response = await fetch("/api/users/followSpace", {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            });
            if (response.status !== 200){
            } else {
                setSpaceId('')
            }
            } catch (error) {
                          }
        }
        handleFollow()
   }
 }, [userId,spaceId]);
  return (
    <div>
        {spaces.map(space => ( // map through the spaces array
          <div className={styles.suggestedSpace} key={space.id}>
              <div className={styles.head}>
                <p className={styles.spaceName} >
                  <Link  href='/space/[id]' as={`/space/${space.id}`} >
                    {space.name}
                  </Link>
                </p>
            </div>
                  <p className={styles.follow}
                   onClick={(e) => { setSpaceId(space.id); e.target.className = styles.followed }}
                  >+ Follow</p>
            </div>
          ))}
    </div>
  )
}
