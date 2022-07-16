import { server } from "../../../config";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router"
import Searchbar from "../../../components/Searchbar";
import styles from "../../../styles/pages/Search.module.scss";

export default function Discussions({ results}) {
    //fetch all discussions from database
  const router = useRouter()

  return (
    <div className={styles.main} >
          <Head>
           <title>{`search ${router.query.search} in users`} </title>
           <meta name={`search ${router.query.search} in users`}  content={`results for ${router.query.search} in users`} />
          </Head>
          <Searchbar />
          {results.length === 1 ? <p className={styles.counter} >{results.length} user found </p>
            : <p className={styles.counter} >{results.length} users found  </p>}
          <div className={styles.users} >
          {results.map(user => ( // map through the spaces array
          <Link  href='/profile/[id]/discussions' as={`/profile/${user.id}/discussions`} key={user.id} >
            <div className={styles.user} >
              <div className={styles.head}>
                  <p className={styles.userName} >
                    {user.name}
                  </p>
              </div>
                <p>{user.bio }</p>
            </div>
          </Link>
          ))}
          </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {

    const resultsRes = await fetch(`${server}/api/users/search?search=${params.search}`)
    const results = await resultsRes.json()
    return {
        props: {
            results
        }
    }
}
