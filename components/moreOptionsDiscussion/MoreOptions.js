import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import Bookmark from './Bookmark';
import styles from '../../styles/components/MoreOptionsDiscussion.module.scss';
import Delete from './Delete';
import Edit from './Edit';

export default function MoreOptions({discussion}) {
  return (
    <div className={styles.main} key={discussion.id} >
      <div className={styles.dots} >
        <BsThreeDotsVertical size={20} />
        <div className={styles.options} >
          <Bookmark discussion={discussion} />
          <Edit discussion={discussion}  />
          <Delete discussion={discussion}  />
      </div>
      </div>
    </div>
  )
}
