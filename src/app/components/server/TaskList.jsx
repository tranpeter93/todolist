'use client'

import styles from '../../styles/tasklist.module.css'
import TaskInput from '../client/TaskInput'
import TaskItem from '../client/TaskItem'

import { useState, useEffect } from 'react'

export default function TaskList() {

   const [taskList, setTaskList] = useState(null)

   //Initialize list
   useEffect(() => {
      updateList()
   })

   const updateList = async () => {
      try {
         fetch ('http://localhost:3000/api/tasklist')
            .then( response => response.json() )
            .then( data => {

               console.log( 'Retrieved data')

               const list = [...data]

               setTaskList(list)

               console.log( taskList )
            })
      }
      catch (error) {
         console.log("Could not retrieve tasklist", error)
      }

      console.log( "LIST", taskList )
   }

   const clearList = async () => {
      try {
         fetch ('http://localhost:3000/api/tasklist', {method: 'DELETE'})
            .then( resp => {
               if ( resp.ok ) {
                  console.log( "Resourcec deleted" )
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
            taskList.map((ele) => { return <TaskItem key={ele.id} item={ele}/>})
         }
         </div>
      )
   }

   return (
      <div className={styles.taskList}>
         <TaskInput updateList={updateList}/>
         {
            renderList()
         }
      </div>
   )
}