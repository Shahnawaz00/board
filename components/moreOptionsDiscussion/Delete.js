import React, { useEffect } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import styles from '../../styles/components/MoreOptionsDiscussion.module.scss';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Delete({ discussion }) {
    const router = useRouter()
    const { data: session } = useSession()
    const userId = session ? session.userId : null
    const isUser = userId === discussion.userId ? true : false

            const handleDelete = () => {
                if (isUser) {
                    const body = { id : discussion.id }
                    try {
                        const response = fetch("/api/discussions", {
                            method: "DELETE",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify(body),
                        });
                        if (response.status !== 200){
                            // on error
                            console.log("there was an error submitting")
                        } else {
                            // on success, clear state to be able to store next bookmarkId
                            router.back()
                            console.log("deleted")
                        }
                    } catch (error) {
                        console.log("there was an error submitting", error);
                    }
                }
            };
  return (
    <>
          {isUser && (
                  <div className={styles.delete} onClick={handleDelete} >
                      <AiOutlineDelete size={22} />
                       <span>Delete</span>
                  </div>
              )}
    </>
  )
}
