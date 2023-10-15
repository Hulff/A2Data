import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"
import { styles, layout } from "./style";
import { NavBar, Welcome, About, ButtonsLinks } from "./components";
import { getData, dbListener } from "./services/firebase";
const App = () => {
  useEffect(() => {
    dbListener("bdsHF");
  }, [])
  return (

    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className='w-screen h-auto'>
              <div className="bg-gradient-to-r from-purple-700 via-blue-700 to-emerald-500 h-20 w-full overflow-hidden">
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
              {/* botões */}
              <div className='h-1/3 mt-10'>
                <About />
                <ButtonsLinks />
              </div>
              {/* video */}
              <div className='h-1/3 my-40 flex sm:flex-row flex-col items-center justify-center'>
                <h2 className='sm:w-1/4 text-center text-lg font-medium mx-5 mb-6'>Vídeo introdutório do
                  projeto A²Database</h2>
                <iframe className="w-4/5 h-64 sm:w-1/2 sm:h-80 md:w-1/3 " src="https://www.youtube.com/embed/EcbGyIlDnZ0?si=dek46r--xL8anjJ0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
              {/* contatos */}
              <div className='h-1/2  flex sm:flex-row flex-wrap flex-col items-center justify-center  '>
                <div className='flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3>Orientador</h3>
                  <FaUserCircle className="w-1/3 h-16 mb-2" />
                  <p className='text-xs text-center px-5'>Na era digital em constante evolução, a tecnologia desempenha um papel central em nossas vidas. Como estudante de Ciência da Computação, minha jornada é uma busca contínua para compreender e moldar esse mundo em constante transformação.Desde os primeiros dias de programação, fui cativado pela capacidade da tecnologia de criar soluções inovadoras. À medida que mergulhei mais fundo em meu curso, aprendi a linguagem das máquinas, descobrindo como transformar linhas de código em aplicativos funcionais e sistemas complexos.</p>
                </div>
                <div className='flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3>Co-Orientador</h3>
                  <FaUserCircle className="w-1/3 h-16 mb-2" />
                  <p className='text-xs text-center px-5'>Na era digital em constante evolução, a tecnologia desempenha um papel central em nossas vidas. Como estudante de Ciência da Computação, minha jornada é uma busca contínua para compreender e moldar esse mundo em constante transformação.Desde os primeiros dias de programação, fui cativado pela capacidade da tecnologia de criar soluções inovadoras. À medida que mergulhei mais fundo em meu curso, aprendi a linguagem das máquinas, descobrindo como transformar linhas de código em aplicativos funcionais e sistemas complexos.</p>
                </div>
                <div className='flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3>Estudante</h3>
                  <FaUserCircle className="w-1/3 h-16 mb-2" />
                  <p className='text-xs text-center px-5'>Na era digital em constante evolução, a tecnologia desempenha um papel central em nossas vidas. Como estudante de Ciência da Computação, minha jornada é uma busca contínua para compreender e moldar esse mundo em constante transformação.Desde os primeiros dias de programação, fui cativado pela capacidade da tecnologia de criar soluções inovadoras. À medida que mergulhei mais fundo em meu curso, aprendi a linguagem das máquinas, descobrindo como transformar linhas de código em aplicativos funcionais e sistemas complexos.</p>
                </div>
                <div className='flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3>Estudante</h3>
                  <FaUserCircle className="w-1/3 h-16 mb-2" />
                  <p className='text-xs text-center px-5'>Na era digital em constante evolução, a tecnologia desempenha um papel central em nossas vidas. Como estudante de Ciência da Computação, minha jornada é uma busca contínua para compreender e moldar esse mundo em constante transformação.Desde os primeiros dias de programação, fui cativado pela capacidade da tecnologia de criar soluções inovadoras. À medida que mergulhei mais fundo em meu curso, aprendi a linguagem das máquinas, descobrindo como transformar linhas de código em aplicativos funcionais e sistemas complexos.</p>
                </div>
              </div>
              <footer className="mt-10 bg-gradient-to-r from-purple-700 via-blue-700 to-emerald-500 h-20 w-full overflow-hidden">
              <h2 className='w-full text-center text-white font-medium text-xl'>Contatos</h2>
              </footer>
            </div>
          </>
        }
      />
    </Routes>
  )
}

export default App
