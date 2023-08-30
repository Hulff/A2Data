import styles from "./style";
import { NavBar } from "./components";

const App = () => {
  return (
    <div className="bg-gradient-to-b from-lime-700 to-lime-900 w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <NavBar />
      </div>
    </div>
  )
}

export default App
