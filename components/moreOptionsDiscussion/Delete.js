import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import styles from '../../styles/components/MoreOptionsDiscussion.module.scss';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import DeleteConfirmation from '../deleteConfirmation';
import Portal from '../../HOC/Portal';

export default function Delete({ discussion }) {
    const router = useRouter()
    const { data: session } = useSession()
    const userId = session ? session.userId : null
    const isUser = userId === discussion.userId ? true : false

    const [confirm, setConfirm] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [deleteClass, setDeleteClass] = useState('')

    useEffect(() => {
        if (deleteConfirm) {
            if (isUser) {
                const body = { id : discussion.id }
                try {
                    const response = fetch("/api/discussions", {
                        method: "DELETE",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(body),
                    });
                    setConfirm(false)
                    setDeleteConfirm(false)
                    setDeleteClass(styles.deleteAfter)

                } catch (error) {
                    console.log('error')
                 }
            }
        }
    }
    , [ deleteConfirm, isUser, discussion.id, router ])


  return (
    <>
         {/* delete icon shown if user is the same as the discussion author */}
          {isUser && (
                  <div className={styles.delete} onClick={() => setConfirm(true) } >
                      <AiOutlineDelete size={22}  />
                       <span className={deleteClass} >Delete</span>
                  </div>
          )}
          {/* confirm modal  */}
          {confirm && (
            <Portal>
             <div className={styles.confirmationWrapper} >  {/* wrapper for greyed out background */}
              <div className={styles.confirmation} >
                  <h3>Confirm</h3>
                  <p>Are you sure you want to delete this?</p>
                  <div className={styles.confirmBtns}>
                        <button className={styles.cancel} onClick={() => setConfirm(false)} >Cancel</button>
                        <button  className={styles.confirm} onClick={() => setDeleteConfirm(true)}>Confirm</button>
                  </div>
               </div>
              </div>
            </Portal>
            ) }
    </>
  )
}
