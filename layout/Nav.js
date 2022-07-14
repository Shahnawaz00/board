import styles from '../styles/Nav.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logo from "../public/images/logo.svg"
import { AiFillHome, AiFillSetting } from 'react-icons/ai'
import {FaListUl, FaSearch, FaUserCircle} from 'react-icons/fa'
import {BsStars, BsPencilSquare, BsFillArrowDownCircleFill, BsSearch, BsBookmarks} from 'react-icons/bs'
import { Hamburger } from './Hamburger';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import LoginBtn from '../components/LoginBtn';
import { useState } from 'react';

export const Nav = () => {
  const router = useRouter()
  const red = '#891204'
  const white = '#636466'

  const { data: session } = useSession()
  const userName = session ? session.user.name : null
  const userImage = session ? session.user.image : null
  const userId = session ? session.userId : null

  const [search, setSearch] = useState();
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
      console.log('entered')
    }
  }

  return (
      <div className={styles.nav} >
          {/* logo  */}
          <Link href="/">
          <Image
              src={logo}
              alt="board logo"
              width={155}
              height={50}
              className={styles.logo}
          />
          </Link>
          <div  className={styles.navDiv} >
           {/* home  */}
            <div className={styles.navLinks} >
              <Link href="/">
                  <AiFillHome color={router.pathname === '/' ? red : white } size={28} />
              </Link>
              <span>
                    Home
              </span>
            </div>
          {/* following  */}
          <div className={styles.navLinks} >
              <Link href="/following">
                  <FaListUl color={router.pathname === '/following' ? red : white } size={28} />
              </Link>
              <span>Following</span>
          </div>

              {/* discover  */}
            <div className={styles.navLinks} >
              <Link href="/discover">
                  <BsStars color={router.pathname === '/discover' ? red : white } size={28} />
              </Link>
              <span>Discover</span>
            </div>
           </div>
          {/* search bar  */}
          <div className={styles.searchMain} >
            <input
              type='text'
              className={styles.search}
              placeholder= ' Search'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={handleKeyPress}
          />
             <Link href='/search/[search]/discussions' as={`/search/${search}/discussions`}>
              <div className={styles.dropdown} >
               <FaSearch color='#636466' size={16} />
               <p>Search : {search} </p>
              </div>
             </Link>
           </div>

          <div className={styles.navDiv} >
             {/* new discussion   */}
            <div className={styles.navLinks} >
              <Link href="/add/newDiscussion">
                    <BsPencilSquare color={router.pathname === '/add/newDiscussion' ? red : white } size={28} />
              </Link>
              <span>New Discussion</span>
              </div>
              {/* bookmark  */}
              <div className={styles.navLinks} >
                  <Link href="/bookmarks">
                      <BsBookmarks color={router.pathname === '/bookmarks' ? red : white } size={28} />
                  </Link>
                  <span>Bookmark</span>
                </div>
          {/* account  */}
            <div className={styles.account} >
              {userName && <Image
              src={userImage}
              alt={userName + ' profile picture'}
              width={30}
              height={30}
              className={styles.account}
          /> }

          {userName ? (
               <div className={styles.accountDropdown} >
                 <span className={styles.accountName}>{ userName}</span>
                  <span>
                   <p className={styles.dropdownLinks}><Link href={`/profile/${userId}/discussions`} >Profile</Link></p>
                  </span>
                  <span>
                   <p className={styles.dropdownLinks} > <Link href='/settings/view' >Account Settings</Link></p>
                  </span>
                  <span><LoginBtn/></span>
                </div>)
                : <LoginBtn/>
                }

              </div>

          </div>
          <Hamburger/>
      </div>
  )
}
