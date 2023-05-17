import styles from './styles/home.module.css'
import FilterOptions from './components/server/FilterOptions'
import TaskList from './components/server/TaskList'

export default function Home() {

  // const todoList = useState([])

  // const todos = useReducer((state, action ) => {
  //   switch (action.type) {
  //     case 'COMPLETED':
  //       return state.map((todo) => {
  //         if ( todo.id === action.id) {
  //           return {...todo, complete: !todo.complete }
  //         }
  //         else {
  //           return todo
  //         }
  //       })

  //       default:
  //         return state;
  //   }
  // }, todoList);

  return (
    <main className={styles.home}>
      <div className={styles.mainView}>
        <FilterOptions/>
        <TaskList/>
      </div>
      <div className={styles.detailedSubView}></div>
    </main>
  )
}
