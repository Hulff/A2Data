import { styles, layout } from "./style";
import { NavBar, Welcome } from "./components";

const App = () => {
  return (
    <div className="bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-800 w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <NavBar />
        </div>
      </div>

      <div className={`${styles.paddingX}`}>
        <div className={`${layout.sectionImg}`}>
          <Welcome />
        </div>
      </div>
    </div>
  )
}

export default App
