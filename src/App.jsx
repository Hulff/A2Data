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
import { NavBar, Welcome, About, ButtonsLinks, A2data } from "./components";
const App = () => {
  const navigate = useNavigate();
  const [btnFunc, setBtnFunc] = useState([]);

  useEffect(() => {
    setBtnFunc([
      () => navigate("/Nossa_missão"),
      () => navigate("/A2Data"),
      () => navigate("/O_Araripe_esta_em_chamas")
    ]);
  }, []);
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
                <iframe className="w-4/5 h-64 sm:w-1/2 sm:h-80 md:w-1/3 " src="https://www.youtube.com/embed/mDkcXrNBXLE?si=1BENys8BQdy2f59_" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
              {/* contatos */}
              <div className='h-1/2  flex sm:flex-row flex-wrap flex-col items-start justify-center  '>
                <div className='flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3>Orientador</h3>
                  <img src='https://i.ibb.co/WkMLxHg/download.png' className="w-1/3 h-30 rounded-full mb-2" />
                  <p className='text-xs text-center px-5'>
                    Rodrigo Queiros de Almeida é doutor em Física e professor de Física
                    do IFCE. Tem experiência em projetos de pesquisa, olimpíadas
                    científicas, torneios de conhecimento e coordena o Comitê Olímpico
                    Institucional do IFCE (COI- IFCE).
                  </p>
                </div>
                <div className='flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3>Co-Orientador</h3>
                  <img src='https://i.ibb.co/Yp6dTcj/Imagem-do-Whats-App-de-2023-10-29-s-19-10-18-00d25fd2.jpg' className="w-1/3 h-30 rounded-full mb-2" />
                  <p className='text-xs text-center px-5'>
                    Pedro Hugo Ursulino Fernandes é um ex-aluno do curso técnico de eletrotécnica do IFCE - Campus Juazeiro do Norte. Atualmente, está cursando Ciências da Computação na UFCA. Durante seus estudos, ele se dedicou à programação, abrangendo tanto o desenvolvimento frontend, com tecnologias como HTML5,CSS e React , quanto o backend, utilizando Javascript e Node.js. Pedro Hugo adquiriu suas habilidades por meio de fóruns, sites e vídeos no YouTube.
                  </p>
                </div>
                <div className='flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3>Estudante</h3>
                  <img src="https://i.ibb.co/rp2Rwjb/image.png" className="w-1/3 h-30 rounded-full mb-2" />
                  <p className='text-xs text-center px-5'>Natanael José Maciel Isidoro é aluno do 3° ano do curso técnico integrado em eletrotécnica do IFCE - Campus Juazeiro do Norte. É bolsista do Comitê Olímpico Institucional do IFCE, sendo medalhista nas mais diversas áreas.</p>
                </div>
                <div className='flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3>Estudante</h3>
                  <img src='https://i.ibb.co/7nfx90x/download.png' className="w-1/3 h-30 rounded-full mb-2" />
                  <p className='text-xs text-center px-5'>Ludmila de Oliveira Agra, aluna do 2° ano do curso técnico integrado em eletrotécnica do IFCE - Campus Juazeiro do Norte. Bolsista de Astronomia e Astrofísica e participante do Comitê Olímpico, ambos do Instituto IFCE e medalhista em olimpaidas voltadas as matérias de ciências.</p>
                </div>
              </div>
              <footer className="mt-10 flex flex-wrap items-stretch justify-center flex-col sm:justify-start sm:flex-row bg-gradient-to-r from-purple-700 via-blue-700 to-emerald-500 h-fit w-full overflow-hidden">
                <h2 className='w-full py-2 text-center text-white font-medium text-xl'>Contatos</h2>
                <ul className='sm:w-auto w-full h-fit mb-5 px-7  text-center sm:text-start sm:grid-rows-4 sm:grid-cols-1 grid-rows-2 grid-cols-2  sm:gap-1 text-white grid h-10'>
                  <li className='mb-2'>(88) 98814-6230</li>
                  <li className='mb-2'>(88) 99362-8012</li>
                  <li className='mb-2'>(85) 99649-7276</li>
                  <li className='mb-2'>(88) 99676-2171</li>
                </ul>
                <ul className='sm:w-auto h-max mb-5 px-7  text-start sm:grid-rows-4 sm:grid-cols-1 grid-rows-4 grid-cols-1  sm:gap-1 text-white grid h-10'>
                  <li className='mb-2'>natanael.jose62@aluno.ifce.edu.br</li>
                  <li className='mb-2'>oliveira.agra08@aluno.ifce.edu.br</li>
                  <li className='mb-2'>rodrigo.almeida@ifce.edu.br</li>
                  <li className='mb-2'>pedro.hugo@aluno.ufca.edu.br</li>
                </ul>
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
            </div>
            <div className='mb-5 sm:flex-row justify-center w-full flex flex-col items-center'>
              <div className=' mt-5 flex flex-col sm:flex-row flex-wrap sm:items-end items-center justify-center'>
                <div className='mb-5 w-full flex justify-start'>
                  <h2 className='xl:ml-12 ml-5 xl:w-1/6  sm:text-xl text-md md:w-1/4 sm:w-1/3 w-3/5 sm:px-0.5  py-2 rounded-2xl text-center bg-gradient-to-r from-purple-800 to-blue-800 text-white font-medium'>Pelo o que Lutamos !</h2>
                </div>
                <img className='self-start xl:w-5/12 rounded-lg sm:rounded-2xl pt-2 md:w-6/12 sm:w-1/2 sm:px-3  w-9/12' src='
                  https://i.ibb.co/QdyXpX3/2-BFDD731-475-C-4-E2-F-B00-E-3-DB16-AE692-C2.jpg'></img>
                <p className=' xl:text-xl md:text-lg sm:text-med text-xs sm:w-2/5 w-4/5 px-2 text-justify'>Somos todos responsáveis por frear e, consequentemente, reduzir as mudanças climáticas em nosso planeta. Mudanças essas que são um dos maiores desafios enfrentados pela nossa geração e por todo o século 21. É consenso entre cientistas do clima que os maiores responsáveis pelas mudanças climáticas são os gases de efeito estufa emitidos principalmente em decorrência da queima de combustíveis fósseis e o desmatamento. A destruição da cobertura vegetal por queimadas, resulta na liberação de dióxido de carbono (CO2) e Compostos Orgânicos Voláteis (VOCs - Volatile Organic Compounds) para atmosfera, reduzindo a absorção do CO2, e assim aumentando o efeito estufa.
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
              <A2data></A2data>
            </div>
          </>
        }
      />
      <Route
        path="/O_Araripe_esta_em_chamas"
        element={
          <>
            <div className='w-screen h-auto mb-10'>
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
              {/*noticia 1 */}
              <div className=' mt-5 flex flex-col items-center justify-center'>
                <div className='mb-5 w-full flex justify-start'>
                  <h2 className='ml-5 xl:ml-12 sm:text-xl text-md xl:w-1/6 md:w-1/4 sm:w-1/3 w-3/5 sm:px-0.5  py-2 rounded-2xl text-center bg-gradient-to-r from-emerald-500 to-[#42eb29] text-white font-medium'>O Araripe está em chamas!</h2>
                </div>
                <div className=' flex py-3 justify-center w-full bg-red-700 text-white'>
                  <p className='indent-2 med:xl sm:text-lg md:text-xl text-xs w-4/5 text-justify'> A situação ambiental da Chapada do Araripe torna-se mais alarmante a cada dia que se passa , aqui estão algumas das mais preocupantes e recentes notícias deploráveis do estado de  nossa floresta.</p>
                </div>
                <div className='mb-5 sm:flex-row justify-center w-full flex flex-col items-center'>
                  <img className=' xl:w-1/3 rounded-2xl pt-2 md:w-1/4 sm:w-1/2 sm:px-3  w-11/12' src='
                  https://s2-g1.glbimg.com/v48XBGXCLRSuaHUsUAKuEVQ7d_0=/0x0:1040x780/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/A/H/AcDMmMSHirwwgF6vZw0g/incendio-fogo.jpeg'></img>
                  <div className='md:w-1/3 sm:w-1/2 w-full flex flex-col items-center'>
                    <p className='mb-3 mt-2 w-11/12 sm:text-xl align-start text-lg font-medium text-black'>
                      Área atingida por incêndio na Floresta Nacional do Araripe pode levar até 30 anos para ser recuperada no Ceará <br />
                    </p>
                    <p className='mb-3 w-11/12 sm:text-lg align-start text-sm text-black'>
                      Equipes do Corpo de Bombeiros, ICMBio, Ibama e voluntários atuaram para debelar as chamas. Fogo também impactou produção de pequi. <br />
                    </p>
                  </div>
                </div>
                <a className='bg-gradient-to-r from-blue-800 to-emerald-500 text-white px-3 rounded-xl py-2 md:animate-none animate-bounce font-medium sm:text-lg text-md' target='blank' href='https://g1.globo.com/ce/ceara/noticia/2020/01/04/area-atingida-por-incendio-na-floresta-nacional-do-araripe-pode-levar-ate-30-anos-para-ser-recuperada-no-ceara.ghtml'>
                  clique aqui para acessar a noticia
                </a>
              </div>
              {/*noticia 2 */}
              <div className=' mt-5 flex flex-col items-center justify-center'>
                <div className='mb-5 sm:flex-row justify-center w-full flex flex-col items-center'>
                  <img className='xl:w-1/3 rounded-2xl pt-2 md:w-1/4 sm:w-1/2 sm:px-3  w-11/12' src='
                  https://s02.video.glbimg.com/x720/11992225.jpg'></img>
                  <div className='md:w-1/3 sm:w-1/2 w-full flex flex-col items-center'>
                    <p className='mb-3 mt-2 w-11/12 sm:text-xl align-start text-lg font-medium text-black'>
                      Incêndio no Ceará dura cinco dias e cobre cidades de fumaça<br />
                    </p>
                    <p className='mb-3 w-11/12 sm:text-lg align-start text-sm text-black'>
                      Incêndio atinge vegetação em Caririaçu e cidades vizinhas, na região Cariri.<br />
                    </p>
                  </div>
                </div>
                <a className='bg-gradient-to-r from-blue-800 to-emerald-500 text-white px-3 rounded-xl py-2 md:animate-none animate-bounce font-medium sm:text-lg text-md' target='blank' href='https://g1.globo.com/ce/ceara/noticia/2023/10/02/incendio-no-ceara-dura-cinco-dias-e-cobre-cidades-de-fumaca.ghtml'>
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
