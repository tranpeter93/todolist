import fs from 'fs'
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
   if ( req.method === 'GET' ) {
      const list = readDataFromFile()

      res.status(200).json(list)
   }
   else if ( req.method === 'POST' ) {
      const {title, description} = req.body
      const taskList = readDataFromFile()
      const newTask = {id: taskList.length+1, title, description, completed: false}
      taskList.push(newTask)

      writeDataToFile(taskList)
      res.status(200).json({message: 'Task added successfully', task: newTask})
   }
   else if ( req.method === 'DELETE' ) {
      writeDataToFile([])
      res.status(200).json({message: 'Task list cleared'})
   }
   else {
      res.status(405).json({ error: 'method not allowed' })
   }
}