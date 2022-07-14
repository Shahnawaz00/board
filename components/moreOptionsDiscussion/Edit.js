import React from 'react'
import { MdEdit } from 'react-icons/md';
import styles from '../../styles/components/MoreOptionsDiscussion.module.scss';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Edit({ discussion }) {
    const { data: session } = useSession()
    const userId = session ? session.userId : null
    const isUser = userId === discussion.userId ? true : false

    return (
        <>
            {isUser && (
                <Link href={`/discussion/${discussion.id}/edit`} >
                  <div className={styles.edit} >
                    <MdEdit size={22} />
                    <span>Edit</span>
                  </div>
                </Link>
            )}
        </>
  )
}
