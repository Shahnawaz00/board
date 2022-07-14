import Head from 'next/head';
import { server } from '../../../config';
import DiscussionList from '../../../components/DiscussionList';
import Footer from '../../../components/Footer';
import SpaceInfo from '../../../components/SpaceInfo';
import SuggestedSpaces from '../../../components/SuggestedSpaces';
import styles from '../../../styles/pages/Space.module.scss';

export default function Space({ space, discussions, users, spaces, suggestedSpaces, followers }) {
  return (
    <div className={styles.spaceMain} >
      <Head>
        <title>{space.name}</title>
        <meta name={'space ' + space.name} content={'space ' + space.name} />
      </Head>
      <div className={styles.mobileSpace}>
          <SpaceInfo space={space}  />
      </div>
      {/*  section 1 */}
      <div className={styles.spaceDiscussions}>
      {discussions.length !== 0 ? <DiscussionList discussions={discussions} spaces={spaces} users={users} />
          : <p className={styles.empty} >This space has no discussions, you can create a new one !</p>}
      </div>
      {/*  section 2 */}
      <div className={styles.section2} >
        <div className={styles.section2Component}>
          <SpaceInfo space={space}  discussions={discussions} followers={followers}  />
        </div>
        <div  className={styles.section2Component}>
          <SuggestedSpaces suggestedSpaces={suggestedSpaces}/>
        </div>
        <div className={styles.section2Component}>
          <Footer />
        </div>
      </div>
    </div>
  )
}


// server side

// get static props for a space
export async function getStaticProps({ params }) {
  const userId = 1

  const spaceRes = await fetch(`${server}/api/spaces/getSpace?id=${params.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  // get discussions with the space id
  const discussionsRes = await fetch(`${server}/api/spaces/getDiscussions?spaceId=${params.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const spacesRes = await fetch(`${server}/api/spaces", {        // get all spaces to to show info in each discussion
  method: "GET",
  headers: {"Content-Type": "application/json"},
});
const usersRes = await fetch(`${server}/api/users", {       // get all users to to show info in each discussion
  method: "GET",
  headers: {"Content-Type": "application/json"},
});
const suggestedSpacesRes = await fetch(`${server}/api/users/getDiscover?userId=${userId}`, {      //get suggested spaces to follow
method: "GET",
headers: { "Content-Type": "application/json" },
});

  //get followers of the space
  const followersRes = await fetch(`${server}/api/spaces/getFollowers?spaceId=${params.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  // get discussions with the space id
  const discussionCountRes = await fetch(`${server}/api/spaces/getFollowers?spaceId=${params.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const followers = await followersRes.json();
  const suggestedSpaces = await suggestedSpacesRes.json();
  const discussions = await discussionsRes.json();
  const space = await spaceRes.json();
  const spaces = await spacesRes.json();
  const users = await usersRes.json();
  return {
    props: {
      space,
      discussions,
      spaces,
      users,
      suggestedSpaces,
      followers,
    }
  }
}


// get static paths for all spaces in the database
export const getStaticPaths = async () => {
    const spacesRes = await fetch(`${server}/api/spaces", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    });
    const spaces = await spacesRes.json();
    const paths = spaces.map(space => ({
        params: {
        id: space.id.toString()
        }
    }))
    return {
        paths,
        fallback: false
    }
 }
