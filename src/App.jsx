import { useState, useEffect } from 'react';
import { styles, layout } from "./style";
import { NavBar, Welcome } from "./components";
import { getData,dbListener } from "./services/firebase";
const App = () => {
  useEffect(()=>{
    dbListener("bdsHF");
  },[])
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
