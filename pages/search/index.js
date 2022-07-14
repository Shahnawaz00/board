import { server } from '../../config';
import styles from '../../styles/components/Searchbar.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Searchbar() {
  const router = useRouter()

  const [search, setSearch] = useState();

  // search when enter is pressed and search is not empty
  const handleKeyPress = (e) => {
    if (e.keyCode === 13 && search !== '') {
      if (router.pathname === '/search/[search]/discussions') {
        router.push(`/search/${search}/discussions`)
      } else if (router.pathname === '/search/[search]/spaces') {
        router.push(`/search/${search}/spaces`)
      } else if (router.pathname === '/search/[search]/users') {
        router.push(`/search/${search}/users`)
      } else if (router.pathname === '/search/[search]/comments') {
        router.push(`/search/${search}/comments`)
      } else {
        router.push(`/search/${search}/discussions`)
      }
    }
  }

  return (
    <div className={styles.indexMain}>
      <Head>
        <title>Search</title>
        <meta name='search board' content='search board' />
      </Head>
      <h1>Search</h1>
      <div className={styles.searchbar} >
            <input
              type='text'
              className={styles.searchInput}
              placeholder= "Let's look for something!"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={handleKeyPress}
          />
      </div>
    </div>
  )
}
