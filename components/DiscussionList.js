import Link from "next/link";
import Image from "next/image";
import styles from "../styles/components/DiscussionList.module.scss";
import { useSession } from "next-auth/react";
import MoreOptions from "./moreOptionsDiscussion/MoreOptions";


const DiscussionList = ({ discussions, users, spaces }) => {
  const { data: session } = useSession()
  const userId = session ? session.userId : null

  //userimage state
  return (
    <div className={styles.discussionList} >
        {discussions.map(discussion => (
          <div className={styles.discussion} key={discussion.id} id={discussion.id} >
            {/* header */}
              <div className={styles.discussionHeader} >
              {/* left side of the header */}
                <div className={styles.header1}>
                 {/* user image  */}
                 {users.map(user => {
                   if (user.id === discussion.userId) {
                     return (
                       <Link href={`/profile/${discussion.userId}/discussions`} key={user.id} >
                         <Image src={user.image} alt="user" width={32} height={32} className={styles.userImage} />
                       </Link>
                     )
                   }
                 })}
                 <div className={styles.header1_1}>
                  {/* user's name, mapped from userdb */}
                  <Link href={`/profile/${discussion.userId}/discussions`}>
                   <p className={styles.name} >
                     {users.map(user => { if (user.id === discussion.userId) { return user.name; } })}
                   </p>
                  </Link>
                {/* user's bio, mapped from userdb */}
                  <p className={styles.bio} >
                    {users.map(user => { if (user.id === discussion.userId) { return user.bio; } })}
                  </p>
                 </div>
                </div>

              {/* right side of the header */}
                <div className={styles.header2}>
                {/* div containing space name and date */}
                  <div className={styles.header2_1} >
                  {/* space name, mapped from spacedb */}
                    <p className={styles.space} >
                    {spaces.map(space => {
                      if (space.id === discussion.spaceId) {
                        return <Link href='/space/[id]' as={`/space/${space.id}`} key={space.id}>{space.name}</Link>
                      }
                    })}
                    </p>
                   {/* date, shortened with .substring to remove time */}
                    <p className={styles.time} >{discussion.createdAt.substring(0, 10)}</p>
                  </div>
                  <MoreOptions discussion={discussion} />
                </div>
              </div>
              {/* title and contents */}
            <div className={styles.discussionContent} >
              {/* title, with link to discussion page */}
                <h3>
                  <Link href='/discussion/[id]' as={`/discussion/${discussion.id}`} >
                    {discussion.title}
                  </Link>
                </h3>
              {/* contents, shortened to display 300 characters only... link to full discussion added after elipses */}
                <div>{discussion.content.substring(0, 300) + '...'}
                  <p className={styles.readMore}>
                    <Link href='/discussion/[id]' as={`/discussion/${discussion.id}`} >View full discussion</Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}

export default DiscussionList
