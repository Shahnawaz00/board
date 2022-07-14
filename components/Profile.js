import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/components/Profile.module.scss'
import { useSession } from 'next-auth/react'

export default function Profile({user}) {
  const router = useRouter()
  const { data: session } = useSession()
  const userId = session ? session.userId : null

  return (
    <div className={styles.profileMain} >
        <h1>{router.query.id === userId ? 'Your' : user.name + "'s" } Profile</h1>
        {/* <p>{discussions.length}</p> */}
        <div>
              <button className={router.pathname === '/profile/[id]/discussions' && styles.red  } >
                  <Link href={`/profile/${router.query.id}/discussions`}  >Discussions</Link>
              </button>
              <button className={router.pathname === '/profile/[id]/comments' && styles.red  } >
                  <Link href={`/profile/${router.query.id}/comments`} >Comments</Link>
              </button>
        </div>
    </div>
  )
}
