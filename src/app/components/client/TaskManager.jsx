'use client'

import { useState } from 'react'

import FilterOptions from './FilterOptions'
import TaskList from './TaskList'
import styles from '../../styles/taskmanager.module.css'

export default function TaskManager() {

   const [filterCompleted, setFilterCompleted] = useState(false)

   const toggleFilterComplete = () => {
      console.log("FILTERING COMPLETED", filterCompleted)

      setFilterCompleted( !filterCompleted )
   }

   return (
      <>
      <div className={styles.mainView}>
         <FilterOptions toggleViewCompletedTasks={toggleFilterComplete}/>
         <TaskList filterCompleted={filterCompleted}/>
         </div>
      <div className={styles.detailedSubView}></div>
      </>
   )
}