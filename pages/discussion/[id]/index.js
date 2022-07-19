import Head from "next/head";
import { server } from "../../../config";
import Image from "next/image";
import {useState} from 'react'
import styles from '../../../styles/Discussion.module.scss'
import Loader from '../../../components/Loader'
import { useSession } from 'next-auth/react';
import CommentList from "../../../components/CommentList";
import MoreOptions from "../../../components/moreOptionsDiscussion/MoreOptions";
import Link from "next/link";

export default function Discussion({ discussion, users, spaces, comments, discussions }) {

  const { data: session } = useSession();
  const userId = session ? session.userId : null;
   // discussion main user info

  const discussionUser = users.find(user => user.id === discussion.userId)
  // discussion space info
  const discussionSpace = spaces.map(space => {
    if (space.id === discussion.spaceId)
      return space.name;
  })

  // state for new comment input
  const [content, setContent] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async(e) => {
    setLoading(true)
    const body = {content, discussionId: discussion.id , userId, spaceId:  discussion.spaceId  }
    try {
      const response = await fetch("/api/comments/newComment", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });
    if (response.status !== 200){
      setLoading(false)
      setMessage('unexpected error')
      //set an error banner here
    } else {
      setContent('')
      setLoading(false)
      setMessage('All done!')
      //set a success banner here
    }
    //check response, if success is false, dont take them to success page
    } catch (error) {
      setLoading(false)
      setMessage('unexpected error')
    }
  }


  return (
    <div className={styles.discussionMain} key={discussion.id} >
       <Head>
        <title>{'board - ' + discussion.title}</title>
        <meta name={discussion.title} content={discussion.title + ' in board'} />
      </Head>

      {/* full discussion */}

      <div className={styles.discussion} key={discussion.id}>
            <div className={styles.discussionHeader}>
              <div className={styles.header1}>
                <Image src={discussionUser.image} alt={discussionUser.name}
                  width={35} height={35} className={styles.userImage} />
                <div className={styles.header1_1}>
                  <Link href={`/profile/${discussion.userId}/discussions`}><p className={styles.name} >{ discussionUser.name }</p></Link>
                  <p className={styles.bio} >{discussionUser.bio}</p>
                </div>
              </div>
              <div className={styles.header2}>
                <div className={styles.header2_1} >
                <Link href='/space/[id]' as={`/space/${discussion.spaceId}`} ><p className={styles.space} >{discussionSpace} </p></Link>
                  <p className={styles.time} >{discussion.createdAt.substring(0, 10)}</p>
                </div>
                <MoreOptions discussion={discussion} />
              </div>
            </div>
            <div className={styles.discussionContent}>
              <h3>{discussion.title}</h3>
              <p>{discussion.content}</p>
            </div>
      </div>

          {/* comments  */}
          <h2 className={styles.commentTitle} >Comments ({comments.length}) </h2>
           {/* make new comment  */}
          <div className={styles.newComment} >
        <textarea placeholder="Write something..." maxLength={500}
               onChange={e => setContent(e.target.value)} value={content} ></textarea>
              <div>
                {loading ? <Loader /> : <p>{message}</p> }
                <p className={styles.commentCounter} >{content.length + '/500'}</p>
                <button onClick={handleSubmit} >Submit</button>
              </div>
          </div>
          {/* all comments  */}
         <CommentList comments={comments} users={users} discussions={discussions} />
    </div>
  )
}



//get static props for all discussion in the database
export const getServerSideProps = async ({params}) => {
    const discussionRes = await fetch(`${server}/api/discussions/getDiscussion?id=${params.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const commentsRes = await fetch(`${server}/api/comments/getComments?id=${params.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const spacesRes = await fetch(`${server}/api/spaces`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  });
  const usersRes = await fetch(`${server}/api/users`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  });
  const discussionsRes = await fetch(`${server}/api/discussions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }
  );

    const users = await usersRes.json();
    const spaces = await spacesRes.json()

    const discussion = await discussionRes.json();
  const comments = await commentsRes.json();
  const discussions = await discussionsRes.json();
    return {
        props: {
            discussion,
            users,
            spaces,
            comments,
            discussions
        }
    };
}
