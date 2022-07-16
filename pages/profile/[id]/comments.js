import Profile from '../../../components/Profile';
import { server } from '../../../config';
import styles from '../../../styles/components/Profile.module.scss';
import CommentList from '../../../components/CommentList';
import Head from 'next/head';

export default function Discussions({users, comments, user, discussions}) {

  return (
    <div className={styles.commentsMain} >
          <Head>
            <title>{user.name + "'s Comments"}</title>
           <meta name={'comments for ' + user.name } content={'comments for ' + user.name }  />
          </Head>
          <Profile user={user} />
          <div className={styles.commentList}>
        {comments.length !== 0 ? <CommentList comments={comments} users={users} discussions={discussions} /> : <span>{user.name } has not made any comments yet</span>}
          </div>
    </div>
  )
}

export const getServerSideProps = async ({params}) => {

    const commentsRes = await fetch(`${server}/api/users/profile/getComments?userId=${params.id}`, {        // get all spaces to to show info in each discussion
    method: "GET",
    headers: { "Content-Type": "application/json" },
    });
    const userRes = await fetch(`${server}/api/users/getUser?userId=${params.id}`, {        // get all spaces to to show info in each discussion
    method: "GET",
    headers: { "Content-Type": "application/json" },
    });
    const discussionsRes = await fetch(`${server}/api/discussions`, {        // get all spaces to to show info in each discussion
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const usersRes = await fetch(`${server}/api/users`, {       // get all users to to show info in each discussion
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const users = await usersRes.json();
    const comments = await commentsRes.json();
    const user = await userRes.json();
    const discussions = await discussionsRes.json();

    // const userId =

    return {
      props: {
            users,
            comments,
            user,
            discussions
      }
    };
  }
