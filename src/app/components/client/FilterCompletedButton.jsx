'use client';

export default function FilterCompletedButton() {
   
   const filterCompleted = () => {

      return requestCompleted();
   }

   return (
      <button className={''} onClick={() => {filterCompleted()}}>Completed</button>
   )
}