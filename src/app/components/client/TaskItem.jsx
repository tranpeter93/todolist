'use client'

import { useEffect, useState } from 'react'
import styles from '../../styles/taskItem.module.css'
import { Input, Button, Container } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TaskItem({item, updateItem, showCompleted }) {

   const [completed, setCompleted] = useState(item.completed)
   const [title, setTitle] = useState(item.title)
   const [isEditingTitle, setIsEditingTitle] = useState(false)
   const [expanded, setExpanded] = useState(false)

   const handleExpand = () => {
      setExpanded(!expanded)
   }

   const onFinishedTask = () => {
      const newCompletionStatus = !completed

      setCompleted( newCompletionStatus )

      updateItem({...item, completed: newCompletionStatus})
   }

   const renderSubsection = () => {
      if ( !expanded ) return <></>;

      return (
         <div className={styles.deets}>
            <div className={styles.description}>
               <span>Description: </span>
               <span>{item.description ? item.description : 'none'}</span>
            </div>
         </div>
      )
   }

   const handleKeyPress = (event) => {
      const enterKeyCode = 13

      if ( event.keyCode === enterKeyCode ) {

         updateItem({...item, title: title})

         setIsEditingTitle( false )
      }
   }

   const handleLossFocus = () => {
      setIsEditingTitle( false )
   }

   const renderTitle = () => {
      
      if ( isEditingTitle ) {
         return (
            <Input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={handleKeyPress} onBlur={handleLossFocus}></Input>
         )
      }
      else {
         return <div className={styles.title} onClick={(event) => {event.stopPropagation(); setIsEditingTitle( !isEditingTitle )}}>{title}</div>
      }
   }

   const renderTaskItem = () => {
      if ( !showCompleted && completed ) {
         return;
      }

      return (
         <Container className={styles.container}  >
            <div className={styles.header}>
               <div className={styles.leftside}>
                  <div className={styles.completed}>
                     <input type="checkbox" 
                        checked={completed} 
                        onChange={() => {onFinishedTask(item)}}>
                     </input>
                  </div>
                  { renderTitle() }                  
               </div>
               <div className={styles.rightside}>
                  <IconButton aria-label="delete" size="small" onClick={handleExpand}>
                     <ExpandMoreIcon/>
                  </IconButton>
               </div>
            </div>
            { renderSubsection() }
            
         </Container>
      )
   }

   return (
      <>
      {renderTaskItem()}
      </>
   )
}