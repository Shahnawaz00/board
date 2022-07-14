import { server } from "../../../config";
import Head from "next/head";
import { useRouter } from "next/router";
import DiscussionList from "../../../components/DiscussionList";
import Searchbar from "../../../components/Searchbar";
import styles from "../../../styles/pages/Search.module.scss";

export default function Discussions({ results, spaces, users }) {
    //fetch all discussions from database
  const router = useRouter()

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

  console.log(params.search)

    const spacesRes = await fetch(`${server}/api/spaces");
    const usersRes = await fetch(`${server}/api/users");

    const users = await usersRes.json();
    const spaces = await spacesRes.json()

    const discussionsRes = await fetch('${server}/api/discussions')
    const discussions = await discussionsRes.json()

    const resultsRes = await fetch(`${server}/api/discussions/search?search=${params.search}`)
    const results = await resultsRes.json()
    return {
        props: {
            discussions,
            results,
            spaces,
            users,
        }
    }
}
