import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/components/CommentList.module.scss'

export default function CommentList({comments, users, discussions}) {
  return (
    <div>
      {/* map out all comments  */}
        {comments.map(comment => (
          <div className={styles.comment} key={comment.id}>
            {/* comment header  */}
            <div className={styles.commentHeader}>
              {/* left side of header  */}
              <div className={styles.commentHeader_1}>
                {/* user image  */}
              {users.map(user => {
                   if (user.id === comment.userId) {
                     return (
                       <Link href={`/profile/${comment.userId}/discussions`}>
                         <Image src={user.image} alt="user" width={28} height={28} className={styles.userImage} />
                       </Link>
                     )
                   }
              })}
                {/* user name and bio  */}
              <div className={styles.cHeader1}>
                <Link href={`/profile/${comment.userId}/discussions`}>
                  <p className={styles.name} >
                    {users.map(user => { if (user.id === comment.userId) { return user.name; } })}
                  </p>
                </Link>
                  <p className={styles.bio} >
                    {users.map(user => { if (user.id === comment.userId) { return user.bio; } })}
                  </p>
                </div>
              </div>
              {/* right side of header  */}
              <Link href={`/discussion/${comment.discussionId}`} >
               <div className={styles.discussionTitle} >
                In : {discussions.map(discussion => {if (discussion.id === comment.discussionId) { return discussion.title.substring(0, 20) + "..."  }} )}s
               </div>
              </Link>
            </div>
            <div className={styles.commentContent}>
              <p>{comment.content}</p>
            </div>
          </div>

         ))}
    </div>
  )
}
