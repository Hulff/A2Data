import styles from "./style";
import { NavBar } from "./components";

const App = () => {
  return (
    <div className="bg-gradient-to-b from-lime-500 to-green-600 w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <NavBar />
      </div>
    </div>
  )
}

export default App
