import { server } from '../../config'
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import styles from '../../styles/pages/newSpace.module.scss'
import { useSession } from 'next-auth/react';
import Head from 'next/head';

const NewSpace = ({ spaces }) => {

  const { data: session } = useSession()

    const spaceNames = spaces.map(space => space.name.toLowerCase())

    const [nameCheck, setNameCheck] = useState('')
    const [nameCheckClass, setNameCheckClass] = useState('')
    const [submitBtnClass, setSubmitBtnClass] = useState('')
    const [btnType, setBtnType] = useState('button')

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    //useEffect to check if the space name is already taken
    useEffect(() => {

        if (name.length > 3) {
            if (spaceNames.includes(name)) {
                setNameCheckClass(styles.red);
                setNameCheck('This name is already taken');
                setSubmitBtnClass(styles.disabled)
                setBtnType('button')
            } else {
                if (name.indexOf(' ') >= 0) {
                    setNameCheckClass(styles.red);
                    setNameCheck('Space name cannot contain spaces');
                    setSubmitBtnClass(styles.disabled)
                    setBtnType('button')
                } else {
                    setNameCheckClass(styles.green);
                    setNameCheck('This name exists!');
                    setSubmitBtnClass(styles.enabled)
                    setBtnType('submit')
                }
            }
        } else {
            if (name.length > 0) {
                setNameCheckClass(styles.red);
                setNameCheck('Minimum 4 characters');
                setSubmitBtnClass(styles.disabled)
                setBtnType('button')
            }

        }
    } , [ spaceNames, name])


    const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true)
      const body = {name, description  }
      try {
        const response = await fetch("/api/spaces/newSpace", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body),
      });
      if (response.status !== 200){
        setLoading(false)
        setMessage('unexpected error')
        //set an error banner here
      } else {
        setName('')
        setDescription('')
        setLoading(false)
        setMessage('Space created!')
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
      } catch (error) {
        setLoading(false)
        setMessage('unexpected error')
      }
    }

  return (
    <div className={styles.main}>
      <Head>
        <title>New Space</title>
        <meta name='new space' content='new space in board' />
      </Head>
     <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)} className={styles.form} >
        {/* name  */}
      <input
          type="text"
          placeholder='What will this space be called?'
          className={styles.name}
          onChange={(e) => setName(e.target.value)}
          value={name}
          minLength="4"
          maxLength="20"
        />
        {/* content  */}
        <textarea
          name="content" id="" cols="30" rows="10"
          placeholder='Write a description...'
          className={styles.content}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          maxLength="150"
        >
        </textarea>
        {/* bottom div  */}
        <div className={styles.bottomDiv} >
            <p className={nameCheckClass} > {''} {nameCheck}</p>
          {/* submit btn  */}
          <div className={styles.submitDiv} >
            {loading ? <Loader/> : message }
            {session ? <button className={submitBtnClass} type={btnType} >Submit</button>
              : <div >Sign in to create a new space</div>}

          </div>
        </div>
      </form>
    </div>
  )
}

export const getServerSideProps = async () => {

    const spacesRes = await fetch(`${server}/api/spaces`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    });

    const spaces = await spacesRes.json()

    return {
      props: {
            spaces
        }
    };
  }

export default NewSpace
