import { useState, useEffect, useRef } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { NavBar, Welcome, About, ButtonsLinks, A2data } from "./components";
import { getUserData, googleLogin, handleUser, login, register, singOutUser } from './services/firebase';
import Account from './components/Account';
import { logo } from './assets';
import { br } from './assets';
import { usa } from './assets';

const App = () => {
  const [user, setUser] = useState();
  const [lang, setLang] = useState(false);
  const [userData, setUserData] = useState()
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const emailInput = useRef()
  const passInput = useRef()
  const emailLoginInput = useRef()
  const passLoginInput = useRef()
  const hiddenElem = useRef()
  const divLogin = useRef()
  const divRegister = useRef()
  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          if (entry.target.id == "paramDiv") {
            hiddenElem.current.forEach((el) => el.classList.remove("show"));
          }
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
      hiddenElem.current = hiddenElements
      const paramDiv = document.querySelectorAll(".param-div")
      paramDiv.forEach((el) => observer.observe(el));
      hiddenElements.forEach((el) => observer.observe(el));
    };

    observeElements();

    // Limpar o observer ao desmontar o componente
    return () => {
      observer.disconnect();
    };
  }, [location.pathname]); // Observa a mudança na rota

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do envio do formulário

    // Restante do seu código de manipulação do formulário
    await login(emailLoginInput.current.value, passLoginInput.current.value, setUser)
  };
  const handleRegister = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do envio do formulário
    // Restante do seu código de manipulação do formulário
    await register(emailInput.current.value, passInput.current.value, setUser)
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleUser(setUser);
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (["en", "en-US"].includes(navigator.language)) {
      setLang(true);
    }
  }, []);

  // singOutUser(setUser)  
  useEffect(() => {
    if (location.pathname === "/Login" && user && !loading) {
      navigate("/Account");
    } else if (location.pathname === "/Account" && !user && !loading) {
      navigate("/Login");
    }
    const fetchData = async () => {
      try {
        const userDbData = await getUserData(user.uid, user.email);
        setUserData(userDbData);
        console.log(userDbData)
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle the error as needed, for example, show a message to the user.
      } finally {
        setLoading(false)

      }
    };
    if (user) {
      fetchData();
    } else {
      setLoading(false)

    }
  }, [user]);


  return (

    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className='w-screen h-auto '>
              <div className='flex md:pr-3 pr-1 justify-end w-screem h-fit'>{
                lang ? (<>
                  <img onClick={() => {
                    setLang(false)
                  }} className='cursor-pointer w-8 h-8' src={br}></img>

                </>) : (<>
                  <img onClick={() => {
                    setLang(true)
                  }} className=' cursor-pointer w-8 h-8' src={usa}></img>
                </>)
              }</div>
              <div className="bg-[#d1d3d4] pt-2 rounded-t-3xl mt-1 z-[4] items-center flex relative h-24 sm:h-28 w-full overflow-hidden">
                <div className={`pl-2 justify-center flex w-full`}>
                  <NavBar user={user} lang={lang} />
                </div>
              </div>
              <div className='relative bg-[rgb(62,64,149)] z-[3] h-1 mt-1 w-full
              '></div>
              {/* botões */}
              <div className='h-1/3 pt-10'>
                <About lang={lang} />
                <ButtonsLinks lang={lang} />
              </div>
              {/* video */}
              <div className='mt-64 w-full flex p justify-center'>
                <div className='flex w-full pl-1 pb-1 items-baseline'>
                  <div className=" transition-all cursor-pointer rounded-t-lg sm:w-[13%] lg:w-[7%] pr-4 pl-4 h-full flex flex-row items-center justify-center  bg-[#d1d3d4]">
                    <img className="h-10 xs:h-10 " src={logo}></img>
                  </div>
                  <h2 className='md:w-1/2 w-[80%] h-auto sm:text-3xl text-lg xs:text-2xl  w-3/5 sm:pl-5  md:rounded-xl pl-3 py-1 text-[rgb(62,64,149)] font-light font-bebas '>
                    {lang ? (
                      <>
                        Project presentation
                      </>
                    ) : (<>
                      Apresentação do Projeto
                    </>)}</h2>
                </div>
              </div>
              <div className='relative  bg-[rgb(62,64,149)] z-[3]  h-1 w-full
              '></div>
              <div className="bg-[url('https://i.ibb.co/rv1NFyg/chapada.png')] bg-cover py-20 text-white md:mt-2 mb-36 flex sm:flex-row flex-col items-center justify-center">
                <iframe className="w-4/5 h-64 sm:w-1/2 sm:h-80 md:w-1/3 " src="https://www.youtube.com/embed/JjqCCSWpVyc?si=87FOTVUbZNRsxMIt" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
              {/*nossa missao*/}
              <div id="paramDiv" className='param-div mt-56 w-full flex p justify-center'>
                <div className='flex w-full pl-1 pb-1 items-baseline'>
                  <div className=" transition-all cursor-pointer rounded-t-lg sm:w-[13%] lg:w-[7%] pr-4 pl-4 h-full flex flex-row items-center justify-center  bg-[#d1d3d4]">
                    <img className="h-10 xs:h-10" src={logo}></img>
                  </div>
                  <h2 className='md:w-1/2 w-[80%] h-auto sm:text-3xl text-lg xs:text-2xl w-3/5 sm:pl-5 pl-3 md:rounded-xl py-1 text-[rgb(62,64,149)] font-light font-bebas '>
                    {lang ? (
                      <>
                        Project Purpose
                      </>
                    ) : (<>
                      Propósito do Projeto
                    </>)}</h2>
                </div>
              </div>
              <div className='relative mb-1 bg-[rgb(62,64,149)] z-[3]  h-1 w-full
              '></div>
              <div className="mt-[-8px] md:mt-2 moveBg md:mx-16 bg-[url('https://i.ibb.co/QdyXpX3/2-BFDD731-475-C-4-E2-F-B00-E-3-DB16-AE692-C2.jpg')] pt-2  bg-cover  justify-end w-auto flex flex-col items-start md:h-[60vh] h-[40vh] transition-all mb-36">
                <div className=' mt-5 flex flex-col sm:flex-row flex-wrap sm:items-end items-center justify-center'>
                  <p className=' xl:text-xl md:text-base md:font-semibold sm:text-med text-white font-bold text-xs sm:w-4/5 px-3 py-2 rounded text-justify bg-[#0000007a]'>
                    {lang ? (
                      <>
                        We are collectively responsible for confronting and mitigating climate change on our planet, one of the major challenges of the 21st century. The destruction of vegetation cover, through wildfires, releases carbon dioxide (CO2) and Volatile Organic Compounds (VOCs), reducing CO2 absorption and intensifying the greenhouse effect. The Araripe-Apodi National Forest is one of Brazil's first protected areas, playing a fundamental role in preserving native species, maintaining water sources in the semiarid region, and preventing desertification in the Northeast.
                      </>
                    ) : (
                      <>
                        Somos coletivamente responsáveis por enfrentar e mitigar as mudanças climáticas em nosso planeta, um dos principais desafios do século 21. A destruição da cobertura vegetal, através de queimadas, libera dióxido de carbono (CO2) e Compostos Orgânicos Voláteis (VOCs), diminuindo a absorção de CO2 e intensificando o efeito estufa. A Floresta Nacional do Araripe-Apodi é uma das primeiras áreas protegidas do Brasil, desempenhando papel fundamental na preservação de espécies nativas, na manutenção de fontes de água no semiárido e na prevenção da desertificação no Nordeste.

                      </>)}
                  </p>
                </div>
              </div>
              {/*Noticias*/}
              <div className='mt-56 w-full flex p justify-center'>
                <div className='flex w-full pl-1 pb-1 items-baseline'>
                  <div className=" transition-all cursor-pointer rounded-t-lg sm:w-[13%] lg:w-[7%] pr-4 pl-4 h-full flex flex-row items-center justify-center  bg-[#d1d3d4]">
                    <img className="h-10 xs:h-10" src={logo}></img>
                  </div>
                  <h2 className='md:w-1/2 w-[80%] h-auto sm:text-3xl text-lg xs:text-2xl w-3/5 sm:pl-5 pl-3  md:rounded-xl py-1 text-[rgb(62,64,149)] font-light font-bebas '>
                    {lang ? (
                      <>
                        News
                      </>
                    ) : (
                      <>
                        Notícias
                      </>)}
                  </h2>
                </div>
              </div>
              <div className='relative  bg-[rgb(62,64,149)] z-[3]  h-1 w-full
              '></div>
              <div onClick={() => {
                navigate('/O_Araripe_esta_em_chamas')
              }} className="cursor-pointer mt-[-2px] pt-[2px] moveBg md:mx-16 bg-[url('https://imgs.search.brave.com/I5ZRKVhEJE9zCwzf7yhB-CNu1BsQd8HtHgdbZUr0WSw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/YWxsYWJvdXRiaXJk/cy5vcmcvbmV3cy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxOC8w/My9maXJlLTEyODB4/ODIxLmpwZw')]  bg-cover  justify-end w-auto flex flex-col items-start md:h-[60vh] h-[50vh] transition-all mb-36">
                <p className='h-full w-full  md:px-8 md:font-bold sm:text-med text-white md:text-5xl sm:text-5xl font-bold items-end text-3xl px-6 py-6 text-start flex bg-[#00000099]'>
                  {lang ? (
                    <>
                      Click here to access news about Chapada do Araripe
                    </>
                  ) : (
                    <>
                      Clique aqui para acessar as noticias sobre a Chapada do Araripe
                    </>)}
                </p>
              </div>
              {/* contatos */}
              <div className='mt-56 w-full flex p justify-center'>
                <div className='flex w-full pl-1 pb-1 items-baseline'>
                  <div className=" transition-all cursor-pointer rounded-t-lg sm:w-[13%] lg:w-[7%] pr-4 pl-4 h-full flex flex-row items-center justify-center  bg-[#d1d3d4]">
                    <img className="h-10 xs:h-10" src={logo}></img>
                  </div>
                  <h2 className='md:w-1/2 w-[80%] h-auto sm:text-3xl text-lg xs:text-2xl w-3/5 sm:pl-5 pl-3  md:rounded-xl py-1 text-[rgb(62,64,149)] font-light font-bebas '>
                    {lang ? (
                      <>
                        Team
                      </>
                    ) : (
                      <>
                        Equipe
                      </>)
                    }</h2>
                </div>
              </div>
              <div className='relative  bg-[rgb(62,64,149)] z-[3]  h-1 w-full
              '></div>
              <div className=' h-1/2 mb-44 mt-24 flex sm:flex-row flex-wrap flex-col items-start justify-center  '>
                <div className=' transition-all duration-700 md:hidden-bottom sm:hidden-left hidden-right flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3 className='font-bold'>
                    {lang ? (
                      <>
                        Advisor
                      </>
                    ) : (<>
                      Orientador
                    </>)}
                  </h3>
                  <img src='https://i.ibb.co/WkMLxHg/download.png' className="w-1/3 h-30 rounded-full mb-2" />
                  <p className='text-xs text-center px-5'>
                    {lang ? (
                      <>
                        Rodrigo Queiros de Almeida is a PhD in Physics and professor of Physics
                        from IFCE. He has experience in research projects, Olympics
                        scientific events, knowledge tournaments and coordinates the Olympic Committee
                        IFCE Institutional (COI- IFCE).
                      </>
                    ) : (<>
                      Rodrigo Queiros de Almeida é doutor em Física e professor de Física
                      do IFCE. Tem experiência em projetos de pesquisa, olimpíadas
                      científicas, torneios de conhecimento e coordena o Comitê Olímpico
                      Institucional do IFCE (COI- IFCE).
                    </>)}
                  </p>
                </div>
                <div className=' transition-all duration-700 md:hidden-bottom sm:hidden-right hidden-left flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3 className='font-bold'>
                    {lang ? (
                      <>
                        Co-supervision
                      </>
                    ) : (
                      <>
                        Co-Orientador
                      </>)}
                  </h3>
                  <img src='https://i.ibb.co/Yp6dTcj/Imagem-do-Whats-App-de-2023-10-29-s-19-10-18-00d25fd2.jpg' className="w-1/3 h-30 rounded-full mb-2" />
                  <p className='text-xs text-center px-5'>
                    {lang ? (
                      <>
                        Pedro Hugo Ursulino Fernandes is a former student of the electrical engineering technical course at IFCE - Campus Juazeiro do Norte. He is currently studying Computer Science at UFCA. During his studies, he dedicated himself to programming, covering both frontend development, with technologies such as HTML5, CSS and React, and backend, using Javascript and Node.js. Pedro Hugo acquired his skills through forums, websites and YouTube videos.
                      </>
                    ) : (<>
                      Pedro Hugo Ursulino Fernandes é um ex-aluno do curso técnico de eletrotécnica do IFCE - Campus Juazeiro do Norte. Atualmente, está cursando Ciências da Computação na UFCA. Durante seus estudos, ele se dedicou à programação, abrangendo tanto o desenvolvimento frontend, com tecnologias como HTML5,CSS e React , quanto o backend, utilizando Javascript e Node.js. Pedro Hugo adquiriu suas habilidades por meio de fóruns, sites e vídeos no YouTube.

                    </>)}
                  </p>
                </div>
                <div className=' transition-all duration-700 md:hidden-bottom sm:hidden-left hidden-right flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3 className='font-bold'>
                    {lang ? (
                      <>
                        Student
                      </>
                    ) : (
                      <>
                        Estudante
                      </>)
                    }</h3>
                  <img src="https://i.ibb.co/kJR1pdb/oie-3p-CQUf-Jxl-KJs.jpg" className="w-1/3 h-30 rounded-full mb-2" />
                  <p className='text-xs text-center px-5'>
                    {lang ? (
                      <>
                        Natanael José Maciel Isidoro is a former student of the integrated technical course in Electrotechnics at IFCE - Campus Juazeiro do Norte. He was a scholarship holder of the IFCE Institutional Olympic Committee, and won medals in several areas.
                      </>
                    ) : (
                      <>
                        Natanael José Maciel Isidoro é um ex-aluno do curso técnico integrado em Eletrotécnica do IFCE - Campus Juazeiro do Norte. Ele foi bolsista do Comitê Olímpico Institucional do IFCE, e conquistou medalhas em diversas áreas.
                      </>)
                    }
                  </p>
                </div>
                <div className=' transition-all duration-700 md:hidden-bottom sm:hidden-right hidden-bottom flex flex-col items-center my-3 sm:w-2/5 md:w-1/5'>
                  <h3 className='font-bold'>
                    {lang ? (
                      <>
                        Student
                      </>
                    ) : (
                      <>
                        Estudante
                      </>)
                    }
                  </h3>
                  <img src='https://i.ibb.co/R4gsyBQ/lud.jpg' className="w-1/3 h-30 rounded-full mb-2" />
                  <p className='text-xs text-center px-5'>
                    {lang ? (
                      <>
                        Ludmila de Oliveira Agra, 3rd year student of the integrated technical course in electrical engineering at IFCE - Campus Juazeiro do Norte. CNPq/MCTI Junior Scholarship in Astronomy and Astrophysics, participant of the Institutional Olympic Committee of the IFCE Institute and medalist in scientific Olympiads at national and international level focused on exact science subjects.
                      </>
                    ) : (
                      <>
                        Ludmila de Oliveira Agra, aluna do 3° ano do curso técnico integrado em eletrotécnica do IFCE - Campus Juazeiro do Norte. Bolsista CNPq/MCTI Junior em Astronomia e Astrofísica, participante do Comitê Olímpico Institucional do Instituto IFCE e medalhista em olimpíadas científicas a nível nacional e internacional voltadas as matérias de ciências exatas.
                      </>)
                    }
                  </p>
                </div>
              </div>
              <div className='mt-56 w-full flex justify-center'>
                <div className='flex w-full pl-1 items-baseline'>
                  <h2 className='md:w-1/2 w-[80%] h-auto sm:text-3xl text-lg xs:text-2xl pl-6 w-3/5 sm:pl-5  pl-3md:rounded-xl  text-[rgb(62,64,149)] font-light font-bebas '>
                    {lang ? (
                      <>
                        Contacts
                      </>
                    ) : (
                      <>
                        Contatos
                      </>)
                    }
                  </h2>
                </div>
              </div>
              <div className='relative  bg-[rgb(62,64,149)] z-[3]  h-1 w-full
              '></div>
              <footer className="flex min-h-fit mt-1 mb-6 py-4 px-4 rounded-b-3xl sm:flex-nowrap flex-wrap items-center justify-start sm:justify-start sm:flex-row bg-[#d1d3d4] md:h-[15rem] h-[19rem] w-full overflow-hidden">
                <div className=" w-full flex items-end justify-center">
                  <div className=" w-auto flex items-end"> <img src={logo} alt="logo" className="w-auto h-14 xs:h-16 sm:h-20 md:h-28 lg:h-32 cursor-pointer" /></div>
                  <h1 className=" cursor-pointer w-auto font-bebas pl-2 text-lg xs:text-2xl  sm:text-[1.55rem] md:text-4xl lg:text-5xl `md:leading-12 sm:leading-6 xs:leading-5  leading-4 text-[rgb(62,64,149)] ">
                    {lang ? (
                      <>
                        Araripe Atmospheric <br />Database
                      </>
                    ) : (
                      <>
                        Banco de Dados<br />
                        Atmosféricos do araripe
                      </>)
                    }
                  </h1>
                </div>
                <div className='w-full  sm:border-l-2 pl-3 sm:border-white flex ss:flex-row flex-col  items-center justify-center'>
                  <ul className='mt-3 font-bebas  md:grid-rows-1 w-auto sm:w-4/12 ss:w-4/12 h-fit   text-center ss:grid-rows-4 ss:grid-cols-1 grid-rows-2 grid-cols-2 text-xl lg:text-3xl  md:text-2xl   text-[rgb(62,64,149)] grid h-10'>
                    <li className='mb-2 px-3 ss:px-1  font-light'>(85) 99649-7276</li>
                    <li className='mb-2 px-3 ss:px-1   font-light'>(88) 99676-2171</li>
                    <li className='mb-2 px-3 ss:px-1  font-light'>(88) 99362-8012</li>
                    <li className='mb-2 px-3 ss:px-1   font-light'>(88) 98814-6230</li>
                  </ul>
                  <ul className='mt-1 ss:mt-2 w-auto font-bebas md:w-auto  md:grid-rows-1 sm:w-auto h-fit text-start sm:grid-rows-4 sm:grid-cols-1 grid-rows-4 grid-cols-1  ss:gap-1 text-xl lg:text-3xl md:text-2xl text-[rgb(62,64,149)] grid h-10'>
                    <li className='mb-1 font-medium'>
                      <a href="mailto:rodrigo.almeida@ifce.edu.br" target="_blank" rel="noopener noreferrer">rodrigo.almeida@ifce.edu.br</a>
                    </li>
                    <li className='mb-1 font-medium'>
                      <a href="mailto:pedro.hugo@aluno.ufca.edu.br" target="_blank" rel="noopener noreferrer">pedro.hugo@aluno.ufca.edu.br</a></li>
                    <li className='mb-1 font-medium'>
                      <a href="mailto:oliveira.agra08@aluno.ifce.edu.br" target="_blank" rel="noopener noreferrer">oliveira.agra08@aluno.ifce.edu.br</a></li>
                    <li className='mb-1 font-medium'>
                      <a href="mailto:natanael.jose62@aluno.ifce.edu.br" target="_blank" rel="noopener noreferrer">natanael.jose62@aluno.ifce.edu.br</a></li>
                  </ul>
                </div>
              </footer>
            </div>
          </>
        }
      />
      <Route
        path="/A2Data"
        element={
          <>
            <div className='w-screen h-auto'>
              <div className='flex md:pr-3 pr-1 justify-end w-screem h-fit'>{
                lang ? (<>
                  <img onClick={() => {
                    setLang(false)
                  }} className='cursor-pointer w-8 h-8' src={br}></img>

                </>) : (<>
                  <img onClick={() => {
                    setLang(true)
                  }} className=' cursor-pointer w-8 h-8' src={usa}></img>
                </>)
              }</div>
              <div className="bg-[#d1d3d4] pt-2 rounded-t-3xl mt-1 z-[4] items-center flex relative h-24 sm:h-28 w-full overflow-hidden">
                <div className={`pl-2 justify-center flex w-full`}>
                  <NavBar user={user} lang={lang} />

                </div>
              </div>
              <div className='relative bg-[rgb(62,64,149)] z-[3] h-1 mt-1 w-full
              '></div>
              <A2data lang={lang}></A2data>
            </div>
          </>
        }
      />
      <Route
        path="/O_Araripe_esta_em_chamas"
        element={
          <>
            <div className='w-screen h-auto mb-10'>
              <div className='flex md:pr-3 pr-1 justify-end w-screem h-fit'>{
                lang ? (<>
                  <img onClick={() => {
                    setLang(false)
                  }} className='cursor-pointer w-8 h-8' src={br}></img>

                </>) : (<>
                  <img onClick={() => {
                    setLang(true)
                  }} className=' cursor-pointer w-8 h-8' src={usa}></img>
                </>)
              }</div>
              <div className="bg-[#d1d3d4] pt-2 rounded-t-3xl mt-1 z-[4] items-center flex relative h-24 sm:h-28 w-full overflow-hidden">
                <div className={`pl-2 justify-center flex w-full`}>
                  <NavBar user={user} lang={lang} />

                </div>
              </div>
              <div className='relative bg-[rgb(62,64,149)] z-[3] h-1 mt-1 w-full
              '></div>
              {/*noticia 1 */}
              <div className=' mt-8 flex flex-col items-center justify-center'>
                <div className='mb-5 w-full flex justify-start'>
                  <h2 className='ml-5 xl:ml-12 sm:text-xl text-md xl:w-1/6 md:w-1/4 sm:w-1/3 w-3/5 sm:px-0.5  py-2 rounded-2xl text-center bg-gradient-to-r from-purple-800 to-blue-800 text-white font-medium'>
                    {
                      lang ? (
                        <>
                          Araripe is burning!
                        </>) : (
                        <>
                          O Araripe está em chamas!
                        </>)
                    }
                  </h2>
                </div>
                <div className=' flex py-3 justify-center w-full bg-red-600 text-white'>
                  <p className='indent-2 font-medium med:xl sm:text-lg md:text-xl text-xs w-4/5 text-justify'>
                    {
                      lang ? (
                        <>
                          The environmental situation of Chapada do Araripe becomes more alarming with each passing day, here are some of the most worrying and recent deplorable news about the state of our forest.
                        </>) : (
                        <>
                          A situação ambiental da Chapada do Araripe torna-se mais alarmante a cada dia que se passa , aqui estão algumas das mais preocupantes e recentes notícias deploráveis do estado de  nossa floresta.
                        </>)
                    }
                  </p>
                </div>
                <div className='mb-5 sm:flex-row justify-center w-full flex flex-col items-center'>
                  <img className=' xl:w-1/3 rounded-2xl pt-2 md:w-1/4 sm:w-1/2 sm:px-3  w-11/12' src='
                  https://s2-g1.glbimg.com/v48XBGXCLRSuaHUsUAKuEVQ7d_0=/0x0:1040x780/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/A/H/AcDMmMSHirwwgF6vZw0g/incendio-fogo.jpeg'></img>
                  <div className='md:w-1/3 sm:w-1/2 w-full flex flex-col items-center'>
                    <p className='mb-3 mt-2 w-11/12 sm:text-xl align-start text-lg font-medium text-black'>
                      {
                        lang ? (
                          <>
                            Area hit by fire in the Araripe National Forest could take up to 30 years to recover in Ceará <br />
                          </>) : (
                          <>
                            Área atingida por incêndio na Floresta Nacional do Araripe pode levar até 30 anos para ser recuperada no Ceará <br />
                          </>)
                      }
                    </p>
                    <p className='mb-3 w-11/12 sm:text-lg align-start text-sm text-black'>
                      {
                        lang ? (
                          <>
                            Teams from the Fire Department, ICMBio, Ibama and volunteers worked to put out the flames. Fire also impacted pequi production.

                          </>) : (
                          <>
                            Equipes do Corpo de Bombeiros, ICMBio, Ibama e voluntários atuaram para debelar as chamas. Fogo também impactou produção de pequi. <br />
                          </>)
                      }
                    </p>
                  </div>
                </div>
                <a className='bg-gradient-to-r from-purple-800 to-blue-800 text-white px-3 rounded-xl py-2 md:animate-none animate-bounce-s font-medium sm:text-lg text-md' target='blank' href='https://g1.globo.com/ce/ceara/noticia/2020/01/04/area-atingida-por-incendio-na-floresta-nacional-do-araripe-pode-levar-ate-30-anos-para-ser-recuperada-no-ceara.ghtml'>
                  {
                    lang ? (
                      <>
                        click here for more info

                      </>) : (
                      <>
                        clique aqui para acessar a noticia
                      </>)
                  }
                </a>
              </div>
              {/*noticia 2 */}
              <div className=' mt-5 flex flex-col items-center justify-center'>
                <div className='mb-5 sm:flex-row justify-center w-full flex flex-col items-center'>
                  <img className='xl:w-1/3 rounded-2xl pt-2 md:w-1/4 sm:w-1/2 sm:px-3  w-11/12' src='
                  https://s02.video.glbimg.com/x720/11992225.jpg'></img>
                  <div className='md:w-1/3 sm:w-1/2 w-full flex flex-col items-center'>
                    <p className='mb-3 mt-2 w-11/12 sm:text-xl align-start text-lg font-medium text-black'>
                      {
                        lang ? (
                          <>
                            Fire in Ceará lasts five days and covers cities in smoke<br />

                          </>) : (
                          <>
                            Incêndio no Ceará dura cinco dias e cobre cidades de fumaça<br />
                          </>)
                      }
                    </p>
                    <p className='mb-3 w-11/12 sm:text-lg align-start text-sm text-black'>
                      {
                        lang ? (
                          <>
                            Fire affects vegetation in Caririaçu and neighboring cities, in the Cariri region.<br />

                          </>) : (
                          <>
                            Incêndio atinge vegetação em Caririaçu e cidades vizinhas, na região Cariri.<br />
                          </>)
                      }
                    </p>
                  </div>
                </div>
                <a className='bg-gradient-to-r from-purple-800 to-blue-800 text-white px-3 rounded-xl py-2 md:animate-none animate-bounce-s font-medium sm:text-lg text-md' target='blank' href='https://g1.globo.com/ce/ceara/noticia/2023/10/02/incendio-no-ceara-dura-cinco-dias-e-cobre-cidades-de-fumaca.ghtml'>
                  {
                    lang ? (
                      <>
                        click here for more info

                      </>) : (
                      <>
                        clique aqui para acessar a noticia
                      </>)
                  }
                </a>
              </div>
            </div>
          </>
        }
      />
      <Route
        path="/Account"
        element={
          <>
            {
              user ? (
                <>
                  {loading ? (
                    // You can show a loading spinner or message here
                    <div className='w-screen h-auto mb-10'>

                      <div className="bg-[#d1d3d4] pt-2 rounded-t-3xl mt-3 z-[4] items-center flex relative h-24 sm:h-28 w-full overflow-hidden">
                        <div className={`pl-2 justify-center flex w-full`}>
                          <NavBar user={user} lang={lang} />

                        </div>
                      </div>
                      <div className='relative bg-[rgb(62,64,149)] z-[3] h-1 mt-1 w-full
                  '></div>
                      <div className='w-full text-center flex justify-center items-center h-[50vh]'>
                        <VscLoading className='animate-spin-color text-7xl ' />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className='w-screen h-auto mb-10'>
                        <div className='flex md:pr-3 pr-1 justify-end w-screem h-fit'>{
                          lang ? (<>
                            <img onClick={() => {
                              setLang(false)
                            }} className='cursor-pointer w-8 h-8' src={br}></img>

                          </>) : (<>
                            <img onClick={() => {
                              setLang(true)
                            }} className=' cursor-pointer w-8 h-8' src={usa}></img>
                          </>)
                        }</div>
                        <div className="bg-[#d1d3d4] pt-2 rounded-t-3xl mt-1 z-[4] items-center flex relative h-24 sm:h-28 w-full overflow-hidden">
                          <div className={`pl-2 justify-center flex w-full`}>
                            <NavBar user={user} lang={lang} />

                          </div>
                        </div>
                        <div className='relative bg-[rgb(62,64,149)] z-[3] h-1 mt-1 w-full
                  '></div>
                        <Account lang={lang} user={user} userData={userData} setData={setUserData} />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>

                </>
              )
            }
          </>
        }
      />
      <Route
        path="/Login"
        element={
          <>
            {
              user ? (
                <></>
              ) : (
                <>
                  {loading ? (
                    // You can show a loading spinner or message here
                    <div className='w-screen h-auto mb-10'>

                      <div className="bg-[#d1d3d4] pt-2 rounded-t-3xl mt-3 z-[4] items-center flex relative h-24 sm:h-28 w-full overflow-hidden">
                        <div className={`pl-2 justify-center flex w-full`}>
                          <NavBar user={user} lang={lang} />

                        </div>
                      </div>
                      <div className='relative bg-[rgb(62,64,149)] z-[3] h-1 mt-1 w-full
                  '></div>
                      <div className='w-full text-center flex justify-center items-center h-[50vh]'>
                        <VscLoading className='animate-spin-color text-7xl ' />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className='w-screen h-auto mb-10 '>
                        <div className='flex md:pr-3 pr-1 justify-end w-screem h-fit'>{
                          lang ? (<>
                            <img onClick={() => {
                              setLang(false)
                            }} className='cursor-pointer w-8 h-8' src={br}></img>

                          </>) : (<>
                            <img onClick={() => {
                              setLang(true)
                            }} className=' cursor-pointer w-8 h-8' src={usa}></img>
                          </>)
                        }</div>
                        <div className="bg-[#d1d3d4] pt-2 rounded-t-3xl mt-3 z-[4] items-center flex relative h-24 sm:h-28 w-full overflow-hidden">
                          <div className={`pl-2 justify-center flex w-full`}>
                            <NavBar user={user} lang={lang} />

                          </div>
                        </div>
                        <div className='relative bg-[rgb(62,64,149)] z-[3] h-1 mt-1 w-full
                  '></div>
                        <div className='w-[200%] flex justify-center mt-10 '>
                          <div ref={divLogin} className='duration-500 transition-all ml-[1%] w-[80%] my flex flex-row items-center shadow-lg rounded justify-center'>
                            <form onSubmit={handleLogin} className='flex flex-col items-center justify-center sm:w-1/2 w-full py-10 md:pb-36'>
                              <h2 className='font-bold text-2xl w-full text-center mb-2'>
                                Login
                              </h2>
                              <h3 onClick={() => {
                                divLogin.current.classList.add("hideLogin")
                                divRegister.current.classList.add("showRegister")
                              }} className='mb-3 cursor-pointer text-[#666666]'>
                                {lang ? (
                                  <>
                                    Don't have an account? Click here
                                  </>
                                ) : (
                                  <>
                                    Não tem uma conta? clique aqui
                                  </>)
                                }
                              </h3>
                              <label className='w-10/12 px-1 font-medium'>
                                E-mail
                              </label>
                              <input ref={emailLoginInput} autoComplete="username" className='border-b-2 w-10/12 my-2 pb-2 px-1 focus:outline-none' type='text' placeholder={lang ? 'Type your e-mail' : 'digite seu e-mail'} />
                              <label className='w-10/12 px-1 font-medium'>
                                Senha
                              </label>
                              <input ref={passLoginInput} autoComplete="current-password" className='border-b-2 w-10/12 my-2 pb-2 px-1 focus:outline-none' type='password' placeholder={lang ? 'Type your password' : "digite a senha"} />
                              <button type='submit' className=' text-white bg-gradient-to-r transition-all from-purple-800 to-blue-800 font-semibold  md:w-1/4 md:hover:w-1/3 w-1/2 justify-center text-center items-center rounded-md flex  sm:text-base sm:w-1/2  text-med h-auto hover:brightness-75 sm:hover:w-5/12 hover:w-7/12 md:hover:w-1/5 my-3 py-2'>
                                Login
                              </button>
                              <button className='text-3xl shadow-md transition-all border md:w-1/4 md:hover:w-1/3 w-1/2 justify-center text-center items-center rounded-md flex sm:text-2xl  sm:w-1/2  text-med h-auto hover:brightness-75 sm:hover:w-5/12 hover:w-7/12 md:hover:w-1/5 my-3 py-2'>
                                <FcGoogle onClick={() => { googleLogin(setUser) }} />
                              </button>
                            </form>
                            <div className="sm:border sm:w-1/2 sm:h-full sm:bg-[url('https://imgs.search.brave.com/hPNKeylLu6eW523kMHlmy8faMioiLax0LVHsLYsrLmI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8w/LzAyL0FyYXJpcGVf/TWFuYWtpbl8oMSku/anBn')] bg-cover bg-top w-[0%]">
                            </div>
                          </div>
                          <div ref={divRegister} className='opacity-0 duration-500 transition-all ml-[3%] w-[80%] flex flex-row items-center shadow-lg rounded justify-center'>
                            <div className="sm:border sm:w-1/2 sm:h-full sm:bg-[url('https://imgs.search.brave.com/jY_u_SnTn1TPmS3oedx_XJbVn8MkmkATONWAAB-S-YA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/Zm9uZGF0aW9uZW5z/ZW1ibGUub3JnL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE5LzA5/LzEtQ0FQQS0yLmpw/Zw')] bg-cover bg-[14%]">
                            </div>
                            <form onSubmit={handleRegister} className='flex flex-col items-center justify-center sm:w-1/2 w-full py-10 md:pb-36'>
                              <h2 onClick={() => {
                                divLogin.current.classList.remove("hideLogin")
                                divRegister.current.classList.remove("showRegister")
                              }} className='font-bold text-2xl w-full text-center mb-2'>
                                Cadastro
                              </h2>
                              <h3 onClick={() => {
                                divLogin.current.classList.remove("hideLogin")
                                divRegister.current.classList.remove("showRegister")
                              }} className='mb-3 cursor-pointer text-[#666666]'>Já tem uma conta? clique aqui</h3>
                              <label className='w-10/12 px-1 font-medium'>
                                E-mail
                              </label>
                              <input ref={emailInput} autoComplete="username" className='border-b-2 w-10/12 my-2 pb-2 px-1 focus:outline-none' type='text' placeholder={lang ? 'Type your e-mail' : 'digite seu e-mail'} />
                              <label className='w-10/12 px-1 font-medium'>
                                Senha
                              </label>
                              <input ref={passInput} autoComplete="current-password" className='border-b-2 w-10/12 my-2 pb-2 px-1 focus:outline-none' type='password' placeholder={lang ? 'Type your password' : "digite a senha"} />
                              <button type='submit' className='transition-all text-white bg-gradient-to-r from-purple-800 to-blue-800 font-semibold  md:w-1/4 md:hover:w-1/3 w-1/2 justify-center text-center items-center rounded-md flex  sm:text-base sm:w-1/2  text-med h-auto hover:brightness-75 sm:hover:w-5/12 hover:w-7/12 md:hover:w-1/5 my-3 py-2'>
                                {lang ? (
                                  <>
                                    Register
                                  </>
                                ) : (
                                  <>
                                    Concluir Cadastro
                                  </>)
                                }
                              </button>
                              <button className='text-3xl shadow-md transition-all border md:w-1/4 md:hover:w-1/3 w-1/2 justify-center text-center items-center rounded-md flex sm:text-2xl  sm:w-1/2  text-med h-auto hover:brightness-75 sm:hover:w-5/12 hover:w-7/12 md:hover:w-1/5 my-3 py-2'>
                                <FcGoogle onClick={() => { googleLogin(setUser) }} />
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )
            }
          </>
        }
      />
    </Routes>
  )
}

export default App
