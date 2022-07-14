import { server } from '../../config';
import Head from 'next/head';
import { MdEdit } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from '../../styles/pages/Settings.module.scss';
import Link from 'next/link';
import LoginBtn from '../../components/LoginBtn';

export default function View() {

    const [user, setUser] = useState([]);
    const { data: session } = useSession();
    const userId = session ? session.userId : null;
    useEffect(() => {
      if (userId) {
        fetch(`${server}/api/users/getUser?userId=${userId}`)
          .then(res => res.json())
          .then(data => {
            setUser(data);
          }
        )
      }
    }, [userId]);

  return (
      userId ? (
        <div className={styles.main} >
        <Head>
          <title>Account settings </title>
          <meta name='Account settings ' content='Account settings' />
        </Head>
        <h1>Account Settings</h1>
        <div>
            <label htmlFor='username' >Username:</label>
            <input name='username' type="text" value={user.name} disabled />

            <label htmlFor='bio' >Status:</label>
            <input name='bio' type="text" value={user.bio} disabled />

            <Link href='/settings/edit' >
              <button>
                Edit <MdEdit size={20} />
              </button>
            </Link>
        </div>
          </div>
        ) : <LoginBtn/>
  )
}
