import { FaSearch } from 'react-icons/fa';
import styles from '../styles/components/Searchbar.module.scss'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
      }
    }
  }

  return (
    <div className={styles.main}>
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
      <div className={styles.navBtns} >
              <button className={router.pathname === '/search/[search]/discussions' ? styles.red : ''  } >
                  <Link href={`/search/${router.query.search}/discussions`}  >Discussions</Link>
              </button>
              <button className={router.pathname === '/search/[search]/comments' ? styles.red : ''   } >
                  <Link href={`/search/${router.query.search}/comments`} >Comments</Link>
              </button>
              <button className={router.pathname === '/search/[search]/users' ? styles.red : ''   } >
                  <Link href={`/search/${router.query.search}/users`} >Users</Link>
              </button>
              <button className={router.pathname === '/search/[search]/spaces' ? styles.red : ''   } >
                  <Link href={`/search/${router.query.search}/spaces`} >Spaces</Link>
              </button>
        </div>
    </div>
  )
}
