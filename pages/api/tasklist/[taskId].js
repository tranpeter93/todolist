import fs, { write } from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'taskList.json')


function readDataFromFile() {
   try {
      const data = fs.readFileSync( dataFilePath, 'utf8' );
      return JSON.parse(data)
   }
   catch (error) {

      console.error( "Could not find existing file at", error)

      return [];
   }
}

function writeDataToFile(data) {
   try {
      fs.writeFileSync(dataFilePath, JSON.stringify(data), 'utf8' )
   }
   catch (error) {
      console.error( 'Error writing data to file:', error)
   }
}

export default function handler(req, res) {

   const {
      query: { taskId },
      body, 
      method
   } = req


   if ( method === 'PUT' ) {
      
      const taskList = readDataFromFile()

      console.log("Current taskList", taskList)
      console.log("trying to update task with id", taskId, 
         "with updated property", body)

      try {
         const numId = parseInt(taskId)   
         const taskIndex = taskList.findIndex((task) => task.id === numId)

         if ( taskIndex !== -1 ) {
            taskList[taskIndex] = body

            console.log( "Updated:", taskList[taskIndex] )
            console.log( "updated tasks:", taskList)

            writeDataToFile( taskList )
         }
         else {
            return res.status(404).json({error: 'Task not found'})
         }

         return res.status(200).json({message: 'Updated task '})
      }
      catch(error) {
         console.error("Error could not update task", error)
         return res.status(500).json({error: 'Internal server error'})
      }
   }
   else {
      return res.status(405).json({ error: 'method not allowed' })
   }

   return res.status( 200 ).json({ message: 'Task updated successfully'})
}