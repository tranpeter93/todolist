'use client'

import { useEffect, useState } from 'react'
import styles from '../../styles/taskItem.module.css'

export default function TaskItem({item, updateItem, showCompleted}) {

   const [completed, setCompleted] = useState(item.completed)
   const [expanded, setExpanded] = useState(false)
   
   useEffect(() => {
      console.log("Item[",item.id,"] completed status:", completed)
   }, [completed])

   const handleExpand = () => {
      setExpanded(!expanded)

      console.log("EXPAND", expanded)
   }

   const onFinishedTask = (val, target) => {
      const newCompletionStatus = !completed

      setCompleted( newCompletionStatus )

      updateItem({...target, completed: newCompletionStatus})
   }

   const renderSubsection = () => {
      if ( !expanded ) return <></>;

      return (
         <div className={styles.deets}>
            test
         </div>
      )
   }

   const renderTaskItem = () => {
      if ( !showCompleted && completed ) {
         return;
      }

      return (
         <div className={styles.container} >
            <div className={styles.header} onClick={handleExpand}>
               <div className={styles.title}>{item.title}</div>
               <div className={styles.description}>{item.description}</div>
               <div className={styles.completed}>
                  <input type="checkbox" checked={completed} 
                  onChange={(e) => {onFinishedTask(e.target.value, item)}}></input>
               </div>
            </div>
            { renderSubsection() }
            
         </div>
      )
   }

   return (
      <>
      {renderTaskItem()}
      </>
   )
}