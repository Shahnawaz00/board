import { server } from "../../../config";
import Head from "next/head";
import { useRouter } from "next/router";
import CommentList from "../../../components/CommentList";
import Searchbar from "../../../components/Searchbar";
import styles from "../../../styles/pages/Search.module.scss";

export default function Comments({ results, discussions, users }) {
    //fetch all discussions from database
  const router = useRouter()

  return (
    <div className={styles.main} >
          <Head>
           <title>{`search ${router.query.search} in comments`} </title>
           <meta name={`search ${router.query.search} in comments`}  content={`results for ${router.query.search} in comments`} />
          </Head>
          <Searchbar />
          {results.length === 1 ? <p className={styles.counter} >{results.length} comment found </p>
            : <p className={styles.counter} >{results.length} comments found  </p>}
          <CommentList comments={results} discussions={discussions} users={users} />
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {

  console.log(params.search)

    const usersRes = await fetch(`${server}/api/users");

    const users = await usersRes.json();

    const discussionsRes = await fetch('${server}/api/discussions')
    const discussions = await discussionsRes.json()

    const resultsRes = await fetch(`${server}/api/comments/search?search=${params.search}`)
    const results = await resultsRes.json()
    return {
        props: {
            discussions,
            results,
            users,
        }
    }
}
