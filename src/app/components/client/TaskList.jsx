'use client'

import { Stack } from '@mui/material'
import styles from '../../styles/tasklist.module.css'
import TaskInput from './TaskInput'
import TaskItem from './TaskItem'

import { useState, useEffect } from 'react'

export default function TaskList({ filterCompleted }) {

   const [taskList, setTaskList] = useState(null)

   //Initialize list
   useEffect(() => {
      updateList()
   }, [])


   const updateTask = (task) => {
      try {
         const url = `/api/tasklist/${task.id}`

         console.log( "PUT request sent to", url)

         const response = fetch (url, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify( task )
         }) 

         if ( response.ok ) {
            console.log( "Task updated for completion" )

            updateList();
         }
         else {
            console.error( "error updating task", response.status )
         }
      }
      catch (error) {
         console.log("Could not retrieve tasklist", error)
      }
   }

   const updateList = async () => {
      try {
         fetch ('/api/tasklist')
            .then( response => response.json() )
            .then( data => {

               console.log( 'Retrieved data')

               const list = [...data]

               setTaskList(list)
            })
      }
      catch (error) {
         console.log("Could not retrieve tasklist", error)
      }
   }

   const clearList = async () => {
      try {
         fetch ('/api/tasklist', {method: 'DELETE'})
            .then( resp => {
               if ( resp.ok ) {
                  console.log( "Resource deleted" )
               }
               else {
                  console.error( "Could not delete resource", response.status )
               }
            })
            .catch( error => {
               console.error( 'Error deleting resource:', error )
            })
      }
      catch (error) {
         console.error( "Could not delete list", error )
      }
   }

   const renderList = () => {

      if ( !taskList ) return 

      return (
         <div>
         {
            taskList.map((ele) => { 
               return <TaskItem key={ele.id} 
                  item={ele} 
                  updateItem={updateTask}
                  showCompleted={ filterCompleted }
                  />
            })
         }
         </div>
      )
   }

   return (
      <div className={styles.taskList}>
         <TaskInput updateList={updateList}/>
         { renderList() }
      </div>
   )
}