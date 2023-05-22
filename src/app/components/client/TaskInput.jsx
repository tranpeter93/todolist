'use client'

import { useState } from 'react'
import styles from '../../styles/taskInput.module.css'
import { Input, Button, Paper, TextField } from '@mui/material';

export default function TaskInput({updateList}) {

   const [ title, setTitle ] = useState('')
   const [ description, setDescription] = useState('')

   const handleAddTask = async () => {

      if ( !title ) {
         console.error("Title is required to add task")
         return;
      }

      try {
         const resp = await fetch('http://localhost:3000/api/tasklist', {
            method: 'POST',
            headers: {
               'Content-type': 'application/json',
            },
            body: JSON.stringify({title, description})
         })

         if ( resp.ok ) {
            setTitle('')
            setDescription('')

            updateList()
         }
         else {
            console.error('Error adding task', resp.statusText)
         }
      }
      catch (error) {
         console.error( "Could not add task", error)
      }
   }

   return (
      <div className={styles.taskInput}>
         <div className={styles.addTask}>
            <Button className={styles.addTaskButton} onClick={() => handleAddTask()}>+</Button>
         </div>
         <div className={styles.taskDetails}>
            <div className={styles.taskTitle}>
               <TextField type='text' label='title' value={title} onChange={(e) => setTitle(e.target.value)} variant="filled" size="small"></TextField>
            </div>
            <div className={styles.taskDescription}>
               <TextField type='text' label='description' value={description} onChange={(e) => {setDescription(e.target.value)}} variant="filled" size="small"></TextField>
            </div>
            <div className={styles.taskDate}>
               {/* <input type='date'></input>
               <input type='date'></input> */}
            </div>
            <div className={styles.taskTime}>
               {/* <input type='time'></input>
               <input type='time'></input> */}
            </div>
            <div className={styles.taskLocation}></div>
         </div>
      </div>
   )
}