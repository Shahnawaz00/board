import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import logo from "../public/images/logo.png";
import styles from "../styles/Hamburger.module.scss"
import { AiFillHome, AiFillSetting } from 'react-icons/ai'
import {FaListUl, FaSearch, FaUserCircle} from 'react-icons/fa'
import {BsStars, BsPencilSquare, BsFillArrowDownCircleFill, BsSearch, BsBookmark} from 'react-icons/bs'
import LoginBtn from "../components/LoginBtn";

export const Hamburger = () => {
  const router = useRouter()

  const { data: session } = useSession()
  const userName = session ? session.user.name : null
  const userImage = session ? session.user.image : null
  const userId = session ? session.userId : null

  return (
    userName ? (
      <div className={styles.menuWrap} >
      <input type='checkbox' className={styles.toggler} />    {/* checkbox to toggle menu */}
               <div className={styles.hamburger} ><div></div></div>  {/* checkbox designed as hamburger */}
               <div className={styles.menu} >
                   <div>
                       <nav>
                        <ul>
                        {/* user image and name  */}
                        <li className={styles.accountLi}>
                        <Image
                             src={userImage}
                             alt={userName + ' profile picture'}
                             width={40}
                             height={40}
                             className={styles.account}
                         />
                          <div className={styles.accountName}>{userName}</div>
                        </li>
                        {/* home  */}
                            <li className={router.pathname === '/' ? styles.activeLink : '' } >
                              <AiFillHome size={22} /><Link href='/'  > Home</Link>
                            </li>
                        {/* following  */}
                            <li className={router.pathname === '/following' ? styles.activeLink : '' } >
                              <FaListUl size={22} /> <Link href='/following'  >Following</Link>
                            </li>
                        {/* discover  */}
                            <li className={router.pathname === '/discover' ? styles.activeLink : '' } >
                              <BsStars size={22} /> <Link href='/discover' >Discover</Link>
                             </li>
                          <hr />  {/* horizontal line */}
                        {/* search  */}
                          <li className={router.pathname === '/search/[search]/discussions' ? styles.activeLink
                          : router.pathname === '/search/[search]/comments' ? styles.activeLink
                          : router.pathname === '/search/[search]/users' ? styles.activeLink
                          : router.pathname === '/search/[search]/spaces' ? styles.activeLink
                          : router.pathname === '/search' ? styles.activeLink : ''  } >
                              <FaSearch size={22} /> <Link href={`/search`} >Search</Link>
                             </li>
                          <hr />  {/* horizontal line */}
                        {/* newDiscussion  */}
                            <li className={router.pathname === '/add/newDiscussion' ? styles.activeLink : '' } >
                              <BsPencilSquare size={22} /> <Link href='/add/newDiscussion' >  New Discussion</Link>
                            </li>
                        {/* bookmarks  */}
                            <li className={router.pathname === '/bookmarks' ? styles.activeLink : '' } >
                              <BsBookmark size={22} /> <Link href='/bookmarks' >Bookmarks</Link>
                            </li>
                            <hr />
                            {/* account  */}
                            <li className={router.pathname === '/profile/[id]/discussions' ? styles.activeLink
                                : router.pathname === '/profile/[id]/comments' ? styles.activeLink : '' } >
                              <FaUserCircle size={22} /> <Link href={`/profile/${userId}/discussions`} > Profile </Link>
                            </li>
                            {/* account settings  */}
                            <li className={router.pathname === '/settings/view' ? styles.activeLink
                                 : router.pathname === '/settings/edit' ? styles.activeLink : ''} >
                              <AiFillSetting size={22} /> <Link href='/settings/view'> Account Settings </Link>
                            </li>
                            {/* logout  */}
                            <li className={styles.loginBtn}>
                             {userName && <LoginBtn/>}
                            </li>
                        </ul>
                        {/* sign in button  */}
                       </nav>
                   </div>
               </div>
      </div>
    ) : <div className={styles.loginBtnMain} ><LoginBtn/></div>
  )
}
