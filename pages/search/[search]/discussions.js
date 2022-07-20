import { server } from "../../../config";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import DiscussionList from "../../../components/DiscussionList";
import Searchbar from "../../../components/Searchbar";
import styles from "../../../styles/pages/Search.module.scss";

export default function Discussions({spaces, users }) {
  const router = useRouter()

  //client side fetch
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`/api/discussions/search?search=${router.query.search}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
      }
    )
  }, [router, results]);

  return (
    <div className={styles.main} >
          <Head>
           <title>{`search ${router.query.search} in discussions`} </title>
           <meta name={`search ${router.query.search} in discussions`}  content={`results for ${router.query.search} in discussions`} />
          </Head>
          <Searchbar />
          {results.length === 1 ? <p className={styles.counter} >{results.length} discussion found </p>
            : <p className={styles.counter} >{results.length} discussions found  </p>}
          <DiscussionList discussions={results} spaces={spaces} users={users} />
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {

    const spacesRes = await fetch(`${server}/api/spaces`);
    const usersRes = await fetch(`${server}/api/users`);

    const users = await usersRes.json();
    const spaces = await spacesRes.json()

    const discussionsRes = await fetch(`${server}/api/discussions`)
    const discussions = await discussionsRes.json()

  //  server side fetch
    // const resultsRes = await fetch(`${server}/api/discussions/search?search=${params.search}`)
    // const results = await resultsRes.json()
    return {
        props: {
            discussions,
            results,
            spaces,
            users,
        }
    }
}
