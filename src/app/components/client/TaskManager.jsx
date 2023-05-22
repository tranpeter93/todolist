'use client'

import { useState } from 'react'

import FilterOptions from './FilterOptions'
import TaskList from './TaskList'
import styles from '../../styles/taskmanager.module.css'

export default function TaskManager() {

   const [filterCompleted, setFilterCompleted] = useState(true)

   const handleToggleViewCompletedTasks = () => {
      setFilterCompleted( !filterCompleted )
   }

   return (
      <>
      <div className={styles.mainView}>
         <FilterOptions toggleViewCompletedTasks={ handleToggleViewCompletedTasks}/>
         <TaskList filterCompleted={filterCompleted}/>
         </div>
      <div className={styles.detailedSubView}></div>
      </>
   )
}