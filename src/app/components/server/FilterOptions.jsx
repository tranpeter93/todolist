import FilterActiveButton from '../client/FilterActiveButton';
import FilterCompletedButton from '../client/FilterCompletedButton';
import styles from '../../styles/filterOptions.module.css'

export default function FilterOptions({requestActives, requestCompleted}) {

   const filterActive = () => {

      console.log("test")

      return requestActives()
   }

   return (
      <div className={styles.filterPanel}>
         <div className={styles.categoryTab}>
            <FilterActiveButton/>
            <FilterCompletedButton/>
         </div>
         <div className={styles.frequencyTab}></div>
      </div>
   )
}