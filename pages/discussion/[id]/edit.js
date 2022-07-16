import Head from 'next/head'
import { server } from '../../../config'
import {useState} from 'react'
import styles from '../../../styles/pages/NewDiscussion.module.scss'
import Loader from '../../../components/Loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'

export default function Edit({discussion}) {
    const router = useRouter()
    const { data: session } = useSession()
    const userId = session ? session.userId : null
    const isUser = userId === discussion.userId ? true : false

    const [title, setTitle] = useState(discussion.title)
    const [content, setContent] = useState(discussion.content)

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')


  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    const body = {id : discussion.id , title, content }
    try {
      const response = await fetch("/api/discussions", {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });
    if (response.status !== 200){
      setLoading(false)
      setMessage('unexpected error')
      //set an error banner here
    } else {
      setTitle('')
      setContent('')
      setLoading(false)
      router.back()
      //set a success banner here
    }
    //check response, if success is false, dont take them to success page
    } catch (error) {
      setLoading(false)
      setMessage('unexpected error')
    }
  }
  return (
    <div>
        {isUser ? (
            <div className={styles.main} >
      <Head>
        <title>Edit - {discussion.title} </title>
        <meta name={'editing ' + discussion.title } content={'editing discussion named ' + discussion.title }  />
      </Head>
      {/* main form  */}
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form} >
        {/* title  */}
      <input
          type="text"
          placeholder='What do you want to dicuss'
          className={styles.title}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          maxLength={50}
        />
        {/* content  */}
        <textarea
          name="content" id="" cols="30" rows="10"
          placeholder='Write a description...'
          className={styles.content}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          maxLength={2000}
        >
        </textarea>
        {/* bottom div  */}
          {/* submit btn  */}
          <div className={styles.submitEditDiv} >
            {loading ? <Loader />
              : <span>{message}</span> }
              <button className={styles.cancelEditBtn} onClick={() => router.back()} >Cancel</button>
              <button type="submit" className={styles.saveEditBtn} >Save Changes</button>
          </div>
      </form>


    </div>
        ) : 'Invalid access'}
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
    const discussionRes = await fetch(`${server}/api/discussions/getDiscussion?id=${params.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const discussion = await discussionRes.json();

    return {
        props: {
            discussion
        }
    };
};
