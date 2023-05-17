'use client'

import styles from '../../styles/taskItem.module.css'

export default function TaskItem({item}) {
   return (
      <div className={styles.container}>{item.title}</div>
   )
}