'use client';

import { Button } from '@mui/material';

export default function FilterCompletedButton({setFilterCompleted}) {

   return (
      <Button className={''} onClick={setFilterCompleted}>Completed</Button>
   )
}