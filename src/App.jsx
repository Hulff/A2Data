import { useState, useEffect, useRef } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { styles, layout } from "./style";
import { NavBar, Welcome, About, ButtonsLinks, A2data } from "./components";
import { googleLogin } from './services/firebase';
const App = () => {
  const navigate = useNavigate();
  const [btnFunc, setBtnFunc] = useState([]);
  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    };

    const options = { passive: true };
    const observer = new IntersectionObserver(callback, options);

    const observeElements = () => {
      const hiddenElements = [
        ...document.querySelectorAll(".hidden-bottom"),
        ...document.querySelectorAll(".hidden-right"),
        ...document.querySelectorAll(".hidden-left"),
      ];

      hiddenElements.forEach((el) => observer.observe(el));
    };

    observeElements();

    // Limpar o observer ao desmontar o componente
    return () => {
      observer.disconnect();
    };
  }, [location.pathname]); // Observa a mudança na rota

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
                <div className={`pl-20 ${styles.flexCenter}`}>
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
              <div className='h-1/3 pt-10'>
                <About />
                <ButtonsLinks btnFunctions={btnFunc} />
              </div>
              {/* video */}
              <div className="bg-[url('https://i.ibb.co/rv1NFyg/chapada.png')] bg-cover py-20 text-white  my-40 flex sm:flex-row flex-col items-center justify-center">
                <h2 className='sm:w-1/4 text-center text-lg font-bold mx-5 mb-6'>Vídeo introdutório do
                  projeto A²Database</h2>
                <iframe className="w-4/5 h-64 sm:w-1/2 sm:h-80 md:w-1/3 " src="https://www.youtube.com/embed/JjqCCSWpVyc?si=87FOTVUbZNRsxMIt" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
              {/*nossa missao*/}
              <div className='w-full flex justify-center'>
                <h2 className='md:w-1/2 w-full sm:text-xl text-md w-3/5 sm:px-0.5 md:rounded-xl py-2 rounded text-center bg-gradient-to-r from-purple-800 to-blue-800 text-white font-medium'>Pelo o que Lutamos ?</h2>
              </div>
              <div className="moveBg md:mx-16 bg-[url('https://i.ibb.co/QdyXpX3/2-BFDD731-475-C-4-E2-F-B00-E-3-DB16-AE692-C2.jpg')] pt-2  bg-cover  justify-end w-auto flex flex-col items-start md:h-[80vh] h-[60vh] transition-all mb-36">
                <div className=' mt-5 flex flex-col sm:flex-row flex-wrap sm:items-end items-center justify-center'>
                  <p className=' xl:text-xl md:text-base md:font-semibold sm:text-med text-white font-bold text-xs sm:w-4/5 px-3 py-2 rounded text-justify bg-[#0000007a]'>Somos coletivamente responsáveis por enfrentar e mitigar as mudanças climáticas em nosso planeta, um dos principais desafios do século 21. A destruição da cobertura vegetal, através de queimadas, libera dióxido de carbono (CO2) e Compostos Orgânicos Voláteis (VOCs), diminuindo a absorção de CO2 e intensificando o efeito estufa. A Floresta Nacional do Araripe-Apodi é uma das primeiras áreas protegidas do Brasil, desempenhando papel fundamental na preservação de espécies nativas, na manutenção de fontes de água no semiárido e na prevenção da desertificação no Nordeste.</p>
                </div>
              </div>
              {/* contatos */}
              <div className=' h-1/2 sm:mb-20  flex sm:flex-row flex-wrap flex-col items-start justify-center  '>
                <div className=' transition-all duration-700 md:hidden-bottom sm:hidden-left hidden-right flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3>Orientador</h3>
                  <img src='https://i.ibb.co/WkMLxHg/download.png' className="w-1/3 h-30 rounded-full mb-2" />
                  <p className='text-xs text-center px-5'>
                    Rodrigo Queiros de Almeida é doutor em Física e professor de Física
                    do IFCE. Tem experiência em projetos de pesquisa, olimpíadas
                    científicas, torneios de conhecimento e coordena o Comitê Olímpico
                    Institucional do IFCE (COI- IFCE).
                  </p>
                </div>
                <div className=' transition-all duration-700 md:hidden-bottom sm:hidden-right hidden-left flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3>Co-Orientador</h3>
                  <img src='https://i.ibb.co/Yp6dTcj/Imagem-do-Whats-App-de-2023-10-29-s-19-10-18-00d25fd2.jpg' className="w-1/3 h-30 rounded-full mb-2" />
                  <p className='text-xs text-center px-5'>
                    Pedro Hugo Ursulino Fernandes é um ex-aluno do curso técnico de eletrotécnica do IFCE - Campus Juazeiro do Norte. Atualmente, está cursando Ciências da Computação na UFCA. Durante seus estudos, ele se dedicou à programação, abrangendo tanto o desenvolvimento frontend, com tecnologias como HTML5,CSS e React , quanto o backend, utilizando Javascript e Node.js. Pedro Hugo adquiriu suas habilidades por meio de fóruns, sites e vídeos no YouTube.
                  </p>
                </div>
                <div className=' transition-all duration-700 md:hidden-bottom sm:hidden-left hidden-right flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3>Estudante</h3>
                  <img src="https://i.ibb.co/rp2Rwjb/image.png" className="w-1/3 h-30 rounded-full mb-2" />
                  <p className='text-xs text-center px-5'>Natanael José Maciel Isidoro é aluno do 3° ano do curso técnico integrado em eletrotécnica do IFCE - Campus Juazeiro do Norte. É bolsista do Comitê Olímpico Institucional do IFCE, sendo medalhista nas mais diversas áreas.</p>
                </div>
                <div className=' transition-all duration-700 md:hidden-bottom sm:hidden-right hidden-bottom flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3>Estudante</h3>
                  <img src='https://i.ibb.co/7nfx90x/download.png' className="w-1/3 h-30 rounded-full mb-2" />
                  <p className='text-xs text-center px-5'>Ludmila de Oliveira Agra, aluna do 2° ano do curso técnico integrado em eletrotécnica do IFCE - Campus Juazeiro do Norte. Bolsista de Astronomia e Astrofísica e participante do Comitê Olímpico, ambos do Instituto IFCE e medalhista em olimpaidas voltadas as matérias de ciências.</p>
                </div>
              </div>
              <footer className="mt-10 flex flex-wrap items-stretch justify-center flex-col sm:justify-start sm:flex-row bg-gradient-to-r from-purple-700 via-blue-700 to-emerald-500 h-fit w-full overflow-hidden">

                <h2 className='animate-bounce-s flex items-center justify-center w-full py-2 mt-4 text-center text-white font-medium text-xl'><FaPhoneAlt className="mr-2 rotate-12" />Contatos </h2>
                <ul className='md:w-full md:grid-cols-4 md:grid-rows-1  sm:w-auto w-full h-fit mb-5 px-7  text-center sm:text-start sm:grid-rows-4 sm:grid-cols-1 grid-rows-2 grid-cols-2  sm:gap-1 text-white grid h-10'>
                  <li className='mb-2 font-medium'>(88) 98814-6230</li>
                  <li className='mb-2 font-medium'>(88) 99362-8012</li>
                  <li className='mb-2 font-medium'>(85) 99649-7276</li>
                  <li className='mb-2 font-medium'>(88) 99676-2171</li>
                </ul>
                <ul className='md:w-full md:grid-cols-4 md:grid-rows-1 sm:w-auto h-max mb-5 px-7  text-start sm:grid-rows-4 sm:grid-cols-1 grid-rows-4 grid-cols-1  sm:gap-1 text-white grid h-10'>
                  <li className='mb-2 font-medium'>natanael.jose62@aluno.ifce.edu.br</li>
                  <li className='mb-2 font-medium'>oliveira.agra08@aluno.ifce.edu.br</li>
                  <li className='mb-2 font-medium'>rodrigo.almeida@ifce.edu.br</li>
                  <li className='mb-2 font-medium'>pedro.hugo@aluno.ufca.edu.br</li>
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
                <div className={`pl-20 ${styles.flexCenter}`}>
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
        path="/A2Data"
        element={
          <>
            <div className='w-screen h-auto'>
              <div className="bg-gradient-to-r from-purple-700 via-blue-700 to-emerald-500 h-20 w-full overflow-hidden">
                <div className={`pl-20 ${styles.flexCenter}`}>
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
                <div className={`pl-20 ${styles.flexCenter}`}>
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
      <Route
        path="/Login"
        element={
          <>
            <div className='w-screen h-auto mb-10'>
              <div className="bg-gradient-to-r from-purple-700 via-blue-700 to-emerald-500 h-20 w-full overflow-hidden">
                <div className={`pl-20 ${styles.flexCenter}`}>
                  <div className={`${styles.boxWidth}`}>
                    <NavBar />
                  </div>
                </div>
              </div>
              <button onClick={() => { googleLogin() }}>dfhgfjfg</button>
            </div>
          </>
        }
      />
    </Routes>
  )
}

export default App
