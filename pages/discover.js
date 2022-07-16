import Head from 'next/head';
import Link from 'next/link';
import DiscoverSpaces from '../components/DiscoverSpaces';
import styles from '../styles/Discover.module.scss'


export default function Discover() {

  return (
      <div className={styles.discover} >
       <Head>
        <title>Discover</title>
        <meta name='board discover page' content=' find spaces' />
      </Head>
      <div className={styles.discoverHeader} >
        <h1>Discover</h1>
        <Link href='/add/newSpace' ><button className={styles.newSpaceBtn} > + New Space</button></Link>
      </div>
      <DiscoverSpaces />
      </div>
  )
}
