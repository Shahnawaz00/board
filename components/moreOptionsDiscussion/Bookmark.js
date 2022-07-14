import React from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Loader from '../Loader';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from '../../styles/components/MoreOptionsDiscussion.module.scss';

export default function Bookmark({discussion}) {

    const { data: session } = useSession()
    const userId = session ? session.userId : null

  const [addBookmarkId, setAddBookmarkId] = useState('');       // set bookmarkId that will be added
  const [removeBookmarkId, setRemoveBookmarkId] = useState('');  // set bookmarkId that will be removed

  const [bookmarksDB, setBookmarksDB] = useState('');         //hold all user bookmarks from database
    const [bookmarkIds, setBookmarkIds] = useState('');         //hold all ids from the bookmarksDB array... to be able to use .includes method

    const [isLoading, setIsLoading] = useState(false);           // set loading state


  // fetch bookmarks from database.. useEffect is used to be able to update the bookmark icons without refreshing the page
  useEffect(() => {
    async function fetchBookmarks() {
      if (userId) {
        const res = await fetch(`/api/users/getBookmarks?userId=${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setBookmarksDB(data);                    // set bookmarksDB
        setBookmarkIds(data.map(bookmark => bookmark.id))  // set bookmarkIds
      }
    }
    fetchBookmarks();
  }, [userId,addBookmarkId, removeBookmarkId, bookmarksDB]);

  // patch requests to add/remove bookmark to database, kept in a useEffect to invoke everytime bookmark icon is clicked
  useEffect( () => {
    // patch request to add bookmark
    const handleAddBookmark = async () => {
      if (addBookmarkId !== '') {
        const body = { userId, bookmarkId: addBookmarkId }
        try {
          const response = await fetch("/api/users/addBookmark", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });
        if (response.status !== 200){
          // on error
        } else {
          // on success, clear state to be able to store next bookmarkId
          setAddBookmarkId('')
        }
        } catch (error) {
          console.log("there was an error submitting", error);
        }
      }
    }
    handleAddBookmark()

    // patch request to remove bookmark
    const handleRemoveBookmark = async () => {
      if (removeBookmarkId !== '') {
        const body = {userId, bookmarkId : removeBookmarkId}
        try {
          const response = await fetch("/api/users/removeBookmark", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });
        if (response.status !== 200){
          //on error
        } else {
          // on success, clear state to be able to store next bookmarkId
          setRemoveBookmarkId('')
        }
        } catch (error) {
          console.log("there was an error submitting", error);
        }
      }
    }
    handleRemoveBookmark()
  }, [userId, addBookmarkId, removeBookmarkId])

  return (
    <div className={styles.bookmark}>
        {/* check if discussion is bookmarked, and display appropriate icon...
         when icon is clicked, discussion id is saved in a state to trigger patch requests for adding/removing bookmark */}
         {bookmarkIds.includes(discussion.id) ? (
          <div  >
          <BsBookmarkFill size={18}  onClick={() => { setRemoveBookmarkId(discussion.id); }} />
          <span>Bookmarked</span>
          </div>
         ) : (
          <div>
            <BsBookmark size={18} onClick={() => setAddBookmarkId(discussion.id)} className={styles.bookmark} />
            <span>Bookmark</span>
          </div>
         )}

    </div>
  )
}
