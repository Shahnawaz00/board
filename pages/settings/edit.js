import Link from 'next/link';
import { server } from '../../config';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../../styles/pages/Settings.module.scss';
import Loader from '../../components/Loader';
import LoginBtn from '../../components/LoginBtn';

export default function Edit() {

    const router = useRouter();

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

    //states for form
    const [name, setName] = useState(session ? session.user.name : '');
    const [bio, setBio] = useState(session ? session.userBio : '');


    //submit form

  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    const body = {id : userId, name,bio  }
    try {
      const response = await  fetch(`${server}/api/users/updateUser`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
    if (response.status !== 200){
      setLoading(false)
      //set an error banner here
    } else {
      setName('')
      setBio('')
      setLoading(false)
      router.push('/settings/view')
      //set a success banner here
    }
    //check response, if success is false, dont take them to success page
    } catch (error) {
      setLoading(false)
    }
  }

  return (
      userId ? (
      <div className={styles.main} >
        <Head>
          <title>Edit account settings </title>
          <meta name='Edit account settings' content='Edit account settings' />
        </Head>
          <h1>Account Settings</h1>
          <form>
            <label htmlFor='username' >Username:</label>
              <input name='username' type="text" value={name} maxLength={14}
                  onChange={e => setName(e.target.value)} />

            <label htmlFor='bio' >Status:</label>
              <input name='bio' type="text" value={bio} maxLength={10}
                  onChange={e => setBio(e.target.value)} />

            <div className={styles.formBtns} >
             <button type='submit' className={styles.submit} onClick={handleSubmit}>Save</button>
             <Link href='/settings/view' >
              <button className={styles.cancel} >
                Cancel
              </button>
             </Link>
              </div>
          </form>
          <span>{loading && <Loader/> }</span>
        </div>
        ) : <LoginBtn/>
  )
}
