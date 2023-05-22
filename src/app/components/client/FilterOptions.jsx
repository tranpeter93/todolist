import FilterActiveButton from './FilterActiveButton';
import FilterCompletedButton from './FilterCompletedButton';
import styles from '../../styles/filterOptions.module.css'

export default function FilterOptions({requestActives, toggleViewCompletedTasks}) {

   return (
      <div className={styles.filterPanel}>
         <div className={styles.categoryTab}>
            {/* <FilterActiveButton setFilterActives={requestActives}/> */}
            <FilterCompletedButton setFilterCompleted={toggleViewCompletedTasks}/>
         </div>
         <div className={styles.frequencyTab}></div>
      </div>
   )
}