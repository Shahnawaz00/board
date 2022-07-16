import Head from 'next/head'
import { server } from '../../config'
import {useState, useEffect} from 'react'
import styles from '../../styles/pages/NewDiscussion.module.scss'
import Loader from '../../components/Loader'
import { useSession } from 'next-auth/react'
import Link from 'next/link';

export default function NewDiscussion({ spaces }) {

  const { data: session } = useSession()
  const userId = session ? session.userId : null

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [space, setSpace] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [discussion , setDiscussion] = useState(0)

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    const spaceId = parseInt(space)
    const body = {title, content,userId, spaceId  }
    try {
      const response = await fetch("/api/discussions", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });
    if (response.status !== 200){
      setLoading(false)
      setMessage('unexpected error')
      //set an error banner here
    } else {
      fetch(`${server}/api/discussions`)
      .then(res => res.json())
        .then(data => {
          setDiscussion(data.find(discussion => discussion.title === title));
        });
      setTitle('')
      setContent('')
      setSpace('')
      setLoading(false)
      setMessage('View your new discussion!')
      //set a success banner here
    }
    //check response, if success is false, dont take them to success page
    } catch (error) {
      setLoading(false)
      setMessage('unexpected error')
    }
  }

  return (
    <div className={styles.main} >
      <Head>
        <title>New Discussion</title>
        <meta name='new dicsussion' content='new discussion in board'  />
      </Head>
      {/* main form  */}
      <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)} className={styles.form} >
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
        <div className={styles.bottomDiv} >
          {/* space  */}
          <div className={styles.selectDiv} >
          In:
            <select name="spaces" id="spaces" value={space} onChange={(e) => setSpace(e.target.value)} >
              <option value="">Select a Space</option>
              {spaces.map(space => (
                <option key={space.id} value={space.id}>{space.name}</option>
              ))}
          </select>
          </div>
          {/* submit btn  */}
          <div className={styles.submitDiv} >
            {loading ? <Loader />
              : <div className={styles.viewNew} ><Link href='/discussion/[id]' as={`/discussion/${discussion.id}`} >{message}</Link></div>}
          {userId? <button type="submit">Submit</button> : <div >Sign in to create a new discussion</div>}
          </div>
        </div>
      </form>


    </div>
  )
}


export const getServerSideProps = async () => {
  const res = await fetch(`${server}/api/spaces`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
});
  const spaces = await res.json()

  return {
    props: {
      spaces
    }
  };
}
