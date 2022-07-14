import styles from '../styles/pages/Bookmarks.module.scss';
import Head from 'next/head';
import { server } from '../config';
import DiscussionList from '../components/DiscussionList';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Bookmarks({ spaces, users }) {

  // fetch all bookmarks from database for user
  const [bookmarks, setBookmarks] = useState([]);
  const { data: session } = useSession();
  const userId = session ? session.userId : null;
  useEffect(() => {
    if (userId) {
      fetch(`${server}/api/users/getBookmarks?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          setBookmarks(data);
        }
      )
    }
  }, [userId]);

  return (
    <div className={styles.main} >
      <Head>
        <title>Bookmarks</title>
        <meta name={'bookmarks'} content={'bookmarks'} />
      </Head>
        <h1>Bookmarks</h1>
      {userId ? <DiscussionList discussions={bookmarks} spaces={spaces} users={users} />
        : <p className={styles.emptyMessage} >Sign in to start adding bookmarks!</p>}
    </div>
  )
}

// get static props from bookmarks
export async function getServerSideProps() {

    const spacesRes = await fetch(`${server}/api/spaces`, {        // get all spaces to to show info in each discussion
    method: "GET",
    headers: {"Content-Type": "application/json"},
  });
  const usersRes = await fetch(`${server}/api/users`, {       // get all users to to show info in each discussion
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

    const spaces = await spacesRes.json();
    const users = await usersRes.json();

    return {
        props: {
            spaces,
            users
        },
    }
}
