import Head from 'next/head';
import { server } from '../config';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss'
import Footer from '../components/Footer'
import DiscussionList from '../components/DiscussionList'
import SuggestedSpaces from '../components/SuggestedSpaces'
import { useSession } from 'next-auth/react';

export default function Home({ spaces, users }) {

  // fetch feed from database
  const [discussions, setDiscussions] = useState([]);
  const { data: session } = useSession();
  const userId = session ? session.userId : null;
  useEffect(() => {
    if (userId) {
      fetch(`/api/users/getFeed?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          setDiscussions(data);
        }
      )
    }
  }, [userId]);

  return (
    <div className={styles.home}>
      <Head>
        <title>Board</title>
        <meta name='board home page' content='board hoome page, discussions' />
      </Head>

      <div className={styles.homeTitle} ><h1>Feed</h1></div>

      <div className={styles.homeMain} >
        <div className={styles.discussions} >
          { userId ? (
          discussions.length !== 0 ? <DiscussionList discussions={discussions} spaces={spaces} users={users}/>
              : <p className={styles.emptyFeed} >Follow some spaces to get a curated feed!</p>)
            : <p className={styles.emptyFeed} >Sign in to get your personalized feed!</p>
          }
      </div>
      {/* section 2  */}
      <div className={styles.section2} >
      <SuggestedSpaces />
      <Footer />
       </div>
     </div>
    </div>
  )
};


// server side


// fetch from database

export const getServerSideProps = async () => {

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

  // const userId =

  return {
    props: {
      spaces,
      users,
    }
  };
}






{/* <Head>
<title>Create Next App</title>
<meta name="description" content="Generated by create next app" />
<link rel="icon" href="/favicon.ico" />
</Head>



<main className={styles.main}>
<h1 className={styles.title}>
  learn to <a href="https://nextjs.org">Next.js!</a>
</h1>

<p className={styles.description}>
  Get started by editing{' '}
  <code className={styles.code}>pages/index.js</code>
</p>

<div className={styles.grid}>
  <a href="https://nextjs.org/docs" className={styles.card}>
    <h2>Documentation &rarr;</h2>
    <p>Find in-depth information about Next.js features and API.</p>
  </a>

  <a href="https://nextjs.org/learn" className={styles.card}>
    <h2>Learn &rarr;</h2>
    <p>Learn about Next.js in an interactive course with quizzes!</p>
  </a>

  <a
    href="https://github.com/vercel/next.js/tree/canary/examples"
    className={styles.card}
  >
    <h2>Examples &rarr;</h2>
    <p>Discover and deploy boilerplate example Next.js projects.</p>
  </a>

  <a
    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    className={styles.card}
  >
    <h2>Deploy &rarr;</h2>
    <p>
      Instantly deploy your Next.js site to a public URL with Vercel.
    </p>
  </a>
</div>
</main>

<footer className={styles.footer}>
<a
  href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
  target="_blank"
  rel="noopener noreferrer"
>
  Powered by{' '}
  <span className={styles.logo}>
    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
  </span>
</a>
</footer> */}
