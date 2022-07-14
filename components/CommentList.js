import Link from 'next/link';
import styles from '../styles/components/CommentList.module.scss'

export default function CommentList({comments, users, discussions}) {
  return (
    <div>
        {comments.map(comment => (
          <div className={styles.comment} key={comment.id}>
            <div className={styles.commentHeader}>
              <div className={styles.cHeader1}>
                <p className={styles.name} >{users.map(user => {if (user.id === comment.userId) { return user.name  }} )}</p>
                <p className={styles.bio} >{users.map(user => {if (user.id === comment.userId) { return user.bio  }} )}</p>
              </div>
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
