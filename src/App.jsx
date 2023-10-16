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
  const navigate = useNavigate();
  const [btnFunc, setBtnFunc] = useState([]);

  useEffect(() => {
    dbListener("bdsHF");
    setBtnFunc([
      () => navigate("/Nossa_missão"),
      () => navigate("/A2Data"),
      () => navigate("/O_Araripe_esta_em_chamas")
    ]);
  }, []); // Empt
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
                <ButtonsLinks btnFunctions={btnFunc} />
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
      <Route
        path="/Nossa_missão"
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
              <div className=' mt-5 flex flex-col items-center justify-center'>
                <div className='mb-5 w-full flex justify-start'>
                  <h2 className='xl:ml-12 ml-5 xl:w-1/6  sm:text-xl text-md md:w-1/4 sm:w-1/3 w-3/5 sm:px-0.5  py-2 rounded-2xl text-center bg-gradient-to-r from-purple-800 to-blue-800 text-white font-medium'>Pelo oque Lutamos</h2>
                </div>
                <p className=' med:xl sm:text-lg text-xs w-4/5 px-2 text-justify'>Somos todos responsáveis por frear e, consequentemente, reduzir as mudanças climáticas em nosso planeta. Mudanças essas que são um dos maiores desafios enfrentados pela nossa geração e por todo o século 21. É consenso entre cientistas do clima que os maiores responsáveis pelas mudanças climáticas são os gases de efeito estufa emitidos principalmente em decorrência da queima de combustíveis fósseis e o desmatamento. A destruição da cobertura vegetal por queimadas, resulta na liberação de dióxido de carbono (CO2) e Compostos Orgânicos Voláteis (VOCs - Volatile Organic Compounds) para atmosfera, reduzindo a absorção do CO2, e assim aumentando o efeito estufa.
                  A Floresta Nacional do Araripe-Apodi, que completou 70 anos em 2016, foi uma das primeiras áreas protegidas do Brasil e a primeira Floresta Nacional do país. Sua criação se deve ao fato de ser fundamental para a manutenção de espécies nativas, pela necessidade de manter as fontes de água do semiárido e impedir o avanço da desertificação no Nordeste.
                </p>
              </div>
            </div>
          </>
        }
      />
      <Route
        path="/A2Data"
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
            </div>
          </>
        }
      />
      <Route
        path="/O_Araripe_esta_em_chamas"
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
              <div className=' mt-5 flex flex-col items-center justify-center'>
                <div className='mb-5 w-full flex justify-start'>
                  <h2 className='ml-5 xl:ml-12 sm:text-xl text-md xl:w-1/6 md:w-1/4 sm:w-1/3 w-3/5 sm:px-0.5  py-2 rounded-2xl text-center bg-gradient-to-r from-emerald-500 to-[#42eb29] text-white font-medium'>O Araripe está em chamas!</h2>
                </div>
                <div className=' flex py-3 justify-center w-full bg-black text-white'>
                  <p className='indent-9 med:xl sm:text-lg md:text-xl text-xs w-4/5 text-justify'> A cada dia se torna mais alarmante a situação ambiental da Chapada do Araripe, aqui estão algumas das mais preocupantes e recentes notícias deploráveis do estado em que esta floresta se encontra.</p>
                </div>
                <div className='mb-5 sm:flex-row justify-center w-full flex flex-col items-center'>
                  <img className=' xl:w-1/3 rounded-lg pt-2 md:w-1/4 sm:w-1/2 sm:px-3  w-11/12' src='
                  https://s2-g1.glbimg.com/v48XBGXCLRSuaHUsUAKuEVQ7d_0=/0x0:1040x780/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/A/H/AcDMmMSHirwwgF6vZw0g/incendio-fogo.jpeg'></img>
                  <div className='md:w-1/3 sm:w-1/2 w-full flex flex-col items-center'>
                    <p className='mb-3 w-11/12 sm:text-xl align-start text-lg font-medium text-black'>
                      Área atingida por incêndio na Floresta Nacional do Araripe pode levar até 30 anos para ser recuperada no Ceará <br />
                    </p>
                    <p className='mb-3 w-11/12 sm:text-lg align-start text-sm text-black'>
                      Equipes do Corpo de Bombeiros, ICMBio, Ibama e voluntários atuaram para debelar as chamas. Fogo também impactou produção de pequi. <br />
                    </p>
                  </div>
                </div>
                  <a className='font-medium sm:text-lg text-md' target='blank' href='https://g1.globo.com/ce/ceara/noticia/2020/01/04/area-atingida-por-incendio-na-floresta-nacional-do-araripe-pode-levar-ate-30-anos-para-ser-recuperada-no-ceara.ghtml'>
                    clique aqui para acessar a noticia
                  </a>
              </div>
            </div>
          </>
        }
      />
    </Routes>
  )
}

export default App
