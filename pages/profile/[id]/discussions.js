import Profile from '../../../components/Profile';
import { server } from '../../../config';
import styles from '../../../styles/components/Profile.module.scss';
import { useSession } from 'next-auth/react';
import DiscussionList from '../../../components/DiscussionList';
import Head from 'next/head';

export default function Discussions({spaces,users, discussions,user}) {

  const { data: session } = useSession();
  const userId = session ? session.userId : null;
  return (
    <div className={styles.discussionsMain} >
          <Head>
            <title>{user.name + "'s Discussions"}</title>
           <meta name={'discussions for ' + user.name } content={'discussions for ' + user.name }  />
          </Head>
          <Profile user={user} />
          <div className={styles.discussionList} >
          {discussions.length !== 0 ? <DiscussionList discussions={discussions} spaces={spaces} users={users} userId={userId} /> : <span>{user.name } has not made any discussions yet</span>}
          </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {

    const discussionsRes = await fetch(`${server}/api/users/profile/getDiscussions?userId=${params.id}`, {        // get all spaces to to show info in each discussion
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
  const userRes = await fetch(`${server}/api/users/getUser?userId=${params.id}`, {        // get all spaces to to show info in each discussion
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

    const spacesRes = await fetch(`${server}/api/spaces`, {        // get all spaces to to show info in each discussion
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    const usersRes = await fetch(`${server}/api/users`, {       // get all users to to show info in each discussion
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const users = await usersRes.json();
    const spaces = await spacesRes.json()
  const discussions = await discussionsRes.json()
  const user = await userRes.json()

    return {
      props: {
        spaces,
        users,
        discussions,
        user
      }
    };
  }
