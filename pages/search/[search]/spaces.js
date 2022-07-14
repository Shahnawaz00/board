import { server } from "../../../config";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router"
import Searchbar from "../../../components/Searchbar";
import SpacesList from "../../../components/SpacesList";
import styles from "../../../styles/pages/Search.module.scss";

export default function Discussions({ results}) {
    //fetch all discussions from database
  const router = useRouter()

  return (
    <div className={styles.main} >
          <Head>
           <title>{`search ${router.query.search} in spaces`} </title>
           <meta name={`search ${router.query.search} in spaces`}  content={`results for ${router.query.search} in spaces`} />
          </Head>
          <Searchbar />
          {results.length === 1 ? <p className={styles.counter} >{results.length} space found </p>
            : <p className={styles.counter} >{results.length} spaces found  </p>}
          <div className={styles.spaces} >
          {results.map(space => ( // map through the spaces array
          <Link  href='/space/[id]' as={`/space/${space.id}`} key={space.id} >
            <div className={styles.space} >
              <div className={styles.head}>
                  <p className={styles.spaceName} >
                      {space.name}
                  </p>
              </div>
                <p>{space.description }</p>
            </div>
          </Link>
          ))}
          </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {

  console.log(params.search)

    const resultsRes = await fetch(`${server}/api/spaces/search?search=${params.search}`)
    const results = await resultsRes.json()
    return {
        props: {
            results
        }
    }
}
