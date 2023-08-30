import styles from "./style";
import { NavBar } from "./components";

const App = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <NavBar />
      </div>
    </div>
  )
}

export default App
