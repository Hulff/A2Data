import { useEffect, useRef, useState } from 'react';
import { getData, db, getHistData, getOptions } from "../services/firebase";
import { collection, onSnapshot, orderBy, limit, query, where } from "firebase/firestore";

import { AiOutlineSearch } from "react-icons/ai"
import { BiLoaderAlt } from "react-icons/bi"
import { TbFileExport } from "react-icons/tb"
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
const A2Data = ({ lang }) => {
    const [state, setState] = useState(null)
    const [id, setId] = useState('0');
    const [histId, setHistId] = useState('');
    const [data, setData] = useState(null);
    const [prevData, setPrevData] = useState(null);
    const [histData, setHistData] = useState([]);
    const [histState, setHistState] = useState(null)
    const removeListener = useRef(null)
    const [years, setY] = useState(null)
    const [monthOpt, setMOp] = useState(null)
    const [yearOpt, setYOp] = useState(null)
    const [sDay, setSday] = useState(null)
    const [eDay, setEday] = useState(null)
    const eDaySelect = useRef(null)
    const sDaySelect = useRef(null)
    const dataRef = useRef(null)

    const compare = () => {
        setPrevData(dataRef.current)
    }
    const handleData = (data) => {
        dataRef.current = data
        setData(data)
    }

    const getYOptions = async () => {
        setHistState(true)
        const options = await getOptions(histId);
        setY(options);
    }
    const getHist = async () => {
        setHistData([])
        console.log(eDay, sDay, monthOpt, yearOpt)
        const histData1 = await getHistData(histId, sDay, eDay, monthOpt, yearOpt)
        setHistData(histData1)
    }
    const resetHist = () => {
        setHistState(null)
        setY(null)
        setYOp(null)
        setMOp(null)
        setSday(null)
        setEday(null)
        setHistData([])
    }

    const convertServerTime = (serverTimeSeconds, serverTimeNanoseconds) => {
        const timestamp = serverTimeSeconds + serverTimeNanoseconds / 1e9;
        const date = new Date(timestamp * 1000);

        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'America/Sao_Paulo', // ajuste conforme necessário
        };

        const formattedDate = date.toLocaleString('pt-BR', options);
        return formattedDate;
    };
    const getSymbol = (key) => {
        switch (key) {
            case "altitude":
                return "m";
            case "voc":
                return "ppm";
            case "co2":
                return "ppm";
            case "co":
                return "ppm";
            case "temp":
                return "ºC";
            case "temperatura":
                return "ºC";
            case "pressao":
                return "kpa";
            case "umidade":
                return "%";
            default:
                return "";
        }
    };



    return (<>
        <div className='w-full flex sm:items-start sm:flex-row flex-col items-center'>
            <div className='w-full sm:w-1/2'>
                <div className=' my-6 w-full flex flex-col items-center'>
                    <div className='backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] transition-all flex-col flex items-center h-fit min-h-[30em] md:w-6/12 sm:w-9/12 w-3/4 flex justify-start text-white bg-gradient-to-r from-purple-800 to-blue-800  rounded-xl pt-4 py-2 pb-6 '>
                        {data ? (
                            <>
                                {Object.keys(data)
                                    .sort()
                                    .filter((key) => key !== "serverTime") // Filtra todas as chaves, exceto "serverTime"
                                    .map((key) => (
                                        <label key={key} className='w-4/5 mb-2 flex items-center text-white bg-gradient-to-r from-purple-900 to-blue-900 rounded-md py-1 pl-3'>
                                            <h3>{key}</h3>
                                            <input
                                                onChange={() => { }}
                                                value={`${data[key]} ${getSymbol(key)}`}
                                                className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-md'
                                            />
                                            <p className='px-3'>{
                                                prevData ? (<>
                                                    {
                                                        prevData[key] > data[key] ? (<>
                                                            <FaArrowTrendDown />
                                                        </>) : (<>
                                                            {
                                                                prevData[key] < data[key] ? (<>
                                                                    <FaArrowTrendUp />
                                                                </>) : (<></>)
                                                            }

                                                        </>)
                                                    }
                                                </>) : (<></>)
                                            }</p>
                                        </label>
                                    ))}
                                {/* Adiciona "serverTime" por último se existir */}
                                {data.serverTime && (
                                    <label className='w-4/5 mb-2 flex items-center text-white bg-gradient-to-r from-purple-900 to-blue-900 rounded-md py-1 pl-3'>

                                        <input
                                            onChange={() => { }}
                                            value={convertServerTime(data.serverTime.seconds, data.serverTime.nanoseconds)}
                                            className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-sm'
                                        />
                                    </label>
                                )}
                            </>
                        ) : (
                            <>
                                <h2 className='font-medium my-4'>
                                    {
                                        lang ? (
                                            <>
                                                Start a search

                                            </>) : (
                                            <>
                                                Inicie uma busca
                                            </>)
                                    }
                                </h2>
                                <input className='animate-pulse pl-2 my-3 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                            </>
                        )}
                    </div>
                </div>
                <div className='mb-10 w-full flex items-center flex-col '>
                    <label className='min-h-fit backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)]  mb-2 flex items-center text-white bg-gradient-to-r from-purple-800 to-blue-800  rounded-md py-1 pl-3 '>
                        <AiOutlineSearch className='text-xl' />
                        <input placeholder={lang ? 'Enter sensor Id' : 'Insira o Id do sensor'}
                            className='  font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1  text-md '
                            onChange={(e) => {
                                setId(e.currentTarget.value)
                                if (removeListener.current) {
                                    removeListener.current(); // chama a função para desligar o listener
                                    removeListener.current = null; // reseta a referência
                                }
                                setState(null);
                            }} />
                    </label>
                    {
                        state ? (
                            <>
                                <button className=' grid-cols-3 grid backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] md:w-2/12 sm:w-5/12 w-1/2 font-medium text-white rounded-md bg-gradient-to-r from-purple-800 to-blue-800 py-2'
                                    onClick={() => {
                                        if (removeListener.current) {
                                            removeListener.current(); // chama a função para desligar o listener
                                            removeListener.current = null; // reseta a referência
                                        }
                                        setState(null);
                                    }}><BiLoaderAlt className='text-xl font-medium align-self-center ml-5 animate-spin cols-span-3 ' /><p className=''>
                                        {
                                            lang ? (
                                                <>
                                                    Stop

                                                </>) : (
                                                <>
                                                    Parar
                                                </>)
                                        }
                                    </p></button>
                            </>
                        ) : (
                            <>
                                <button className='backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] md:w-2/12 sm:w-5/12 w-1/3 font-medium text-white rounded-md bg-gradient-to-r from-purple-800 to-blue-800 my-1 py-2'
                                    onClick={() => {
                                        const unsubscribe = onSnapshot(
                                            query(collection(db, "sensors", "data", id), orderBy("serverTime", "desc"), limit(1)),
                                            (snapshot) => {
                                                let dbData = null;
                                                compare()
                                                snapshot.forEach((doc) => {
                                                    dbData = doc.data();
                                                });

                                                if (dbData) {
                                                    handleData(dbData);
                                                } else {
                                                    console.log("Nenhum dado encontrado.");
                                                    unsubscribe();
                                                }
                                            }
                                        );

                                        removeListener.current = unsubscribe;
                                        setState(true);
                                    }}
                                >
                                    {
                                        lang ? (
                                            <>
                                                Search

                                            </>) : (
                                            <>
                                                Buscar
                                            </>)
                                    }
                                </button>
                            </>
                        )
                    }

                </div>
            </div>
            <div className='w-full sm:w-1/2'>

                <div className=' my-6 w-full flex flex-col items-center'>
                    <div className='hist backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] transition-all flex-col flex items-center max-h-20 min-h-[30em] md:w-6/12 sm:w-9/12 w-3/4 flex justify-start text-white bg-gradient-to-r from-blue-800 to-purple-800  rounded-xl pt-4 py-2 pb-6 overflow-y-scroll '>
                        {histData.length > 0 ? (
                            <>
                                {
                                    histData.map((obj, index) => (
                                        <div className='rounded-xl my-3 flex flex-col items-center pt-4 py-3 w-11/12 bg-gradient-to-r from-blue-900 to-purple-900' key={index}>
                                            <h2 className='mb-1 font-medium w-8/12 text-start'>{lang ? 'Data' : 'Dado'} nº {index + 1}</h2>
                                            {Object.keys(obj)
                                                .sort()
                                                .filter((key) => key !== "serverTime")
                                                .map((key) => (
                                                    <label
                                                        key={key}
                                                        className='w-4/5 mb-2 flex items-center text-white bg-gradient-to-r from-blue-800 to-purple-800 rounded-md py-1 pl-3'
                                                    >
                                                        <h3>{key}</h3>
                                                        <input
                                                            onChange={() => { }}
                                                            value={`${obj[key]} ${getSymbol(key)}`}
                                                            className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-md'
                                                        />
                                                    </label>
                                                ))}
                                            {obj.serverTime && (
                                                <label className='w-4/5 mb-2 flex items-center text-white bg-gradient-to-r from-blue-800 to-purple-800 rounded-md py-1 pl-3'>

                                                    <input
                                                        onChange={() => { }}
                                                        value={convertServerTime(obj.serverTime.seconds, obj.serverTime.nanoseconds)}
                                                        className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-sm'
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                <h2 className='font-medium my-4' >
                                    {
                                        lang ? (
                                            <>
                                                Historic

                                            </>) : (
                                            <>
                                                Histórico
                                            </>)
                                    }
                                </h2>
                                <input className='animate-pulse pl-2 my-3 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                                <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>

                            </>
                        )}
                    </div>
                </div>
                <div className='mb-20 w-full flex items-center md:justify-evenly md:flex-row flex-wrap flex-col '>
                    <label className=' md:mx-[25%] backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] mb-2 flex items-center text-white bg-gradient-to-r from-blue-800 to-purple-800  rounded-md py-1 pl-3 '>
                        <AiOutlineSearch className='text-xl' />
                        <input placeholder={lang ? 'Enter sensor Id' : 'Insira o Id do sensor'}
                            className='  font-medium bg-transparent focus-visible:outline-0 w-fit placeholder:text-white text-white pl-2 py-1  text-md '
                            onChange={(e) => {
                                setHistId(e.currentTarget.value)
                                resetHist()
                            }} />
                    </label>
                    <>
                        {
                            years ? (
                                <>
                                    <label className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)]  md:w-5/12 w-7/12 mb-2 flex items-center text-white bg-gradient-to-r from-blue-800 to-purple-800  rounded-md py-1 pl-3 '>
                                        <select onChange={(e) => {
                                            console.log(e.target.value)
                                            setYOp(e.target.value)
                                        }} className='font-medium bg-transparent focus-visible:outline-0 w-11/12  placeholder:text-white text-white px-2 py-1 text-md'>
                                            <option className='text-black' defaultValue="" disabled selected hidden>
                                                {
                                                    lang ? (
                                                        <>
                                                            choose a year

                                                        </>) : (
                                                        <>
                                                            Escolha um ano
                                                        </>)
                                                }
                                            </option>
                                            {Object.keys(years).map((key) => (
                                                <option className='text-black' value={key} key={key}>{key}</option>
                                            ))}
                                        </select>
                                    </label>

                                    {yearOpt ? (
                                        <>
                                            <label className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)]  md:w-5/12 w-7/12  mb-2 flex items-center text-white  md:from-purple-800 md:to-blue-800  bg-gradient-to-r from-blue-800 to-purple-800  rounded-md py-1 pl-3 '>
                                                <select onChange={(e) => {
                                                    console.log(e.target.value)
                                                    setMOp(e.target.value)
                                                    setSday(null)
                                                    setEday(null)
                                                    eDaySelect.current.selectedIndex = 0
                                                    sDaySelect.current.selectedIndex = 0
                                                }} className='font-medium bg-transparent focus-visible:outline-0 w-11/12  placeholder:text-white text-white px-2 py-1 text-md'>
                                                    <option className='text-black' defaultValue="" disabled selected hidden>
                                                        {
                                                            lang ? (
                                                                <>
                                                                    choose a month

                                                                </>) : (
                                                                <>
                                                                    Escolha um mês
                                                                </>)
                                                        }
                                                    </option>
                                                    {Object.keys(years[`${yearOpt}`]).map((key) => (
                                                        <option className='text-black' value={key} key={key}>{key}</option>
                                                    ))}
                                                </select>
                                            </label>
                                            {monthOpt ? (
                                                <>
                                                    <label className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)]  md:w-5/12 w-7/12  mb-2 flex items-center text-white  bg-gradient-to-r  from-blue-800 to-purple-800  rounded-md py-1 pl-3 '>
                                                        <select ref={sDaySelect} onChange={(e) => {
                                                            console.log(e.target.value)
                                                            setSday(e.target.value)
                                                            setEday(null)
                                                            eDaySelect.current.selectedIndex = 0
                                                        }} className='font-medium bg-transparent focus-visible:outline-0 w-11/12  placeholder:text-white text-white px-2 py-1 text-md'>
                                                            <option className='text-black' defaultValue="" disabled selected hidden>{
                                                                lang ? (
                                                                    <>
                                                                        choose a start day

                                                                    </>) : (
                                                                    <>
                                                                        Escolha o dia de início
                                                                    </>)
                                                            }</option>
                                                            {years[`${yearOpt}`][`${monthOpt}`]
                                                                .map(Number)
                                                                .sort((a, b) => a - b)
                                                                .map((key) => (
                                                                    <option className='text-black' value={key} key={key}>
                                                                        {key}
                                                                    </option>
                                                                ))}


                                                        </select>
                                                    </label>
                                                    {sDay ? (
                                                        <>
                                                            <label className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)]  md:w-5/12 w-7/12 mb-2 flex items-center text-white md:from-purple-800 md:to-blue-800 bg-gradient-to-r from-blue-800 to-purple-800  rounded-md py-1 pl-3 '>
                                                                <select ref={eDaySelect} onChange={(e) => {
                                                                    console.log(e.target.value)
                                                                    setEday(e.target.value)
                                                                }} className='font-medium bg-transparent focus-visible:outline-0 w-11/12 placeholder:text-white text-white px-2 py-1 text-md'>
                                                                    <option className='text-black' defaultValue="" disabled selected hidden>{
                                                                        lang ? (
                                                                            <>
                                                                                choose a end day

                                                                            </>) : (
                                                                            <>
                                                                                Escolha o dia final
                                                                            </>)
                                                                    }</option>
                                                                    {years[`${yearOpt}`][`${monthOpt}`]
                                                                        .map(Number)
                                                                        .sort((a, b) => a - b)
                                                                        .filter(key => parseFloat(key) >= parseFloat(sDay)).map((key) => (
                                                                            <option className='text-black' value={key} key={key}>{key}</option>
                                                                        ))}
                                                                </select>
                                                            </label>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )

                                                    }

                                                </>
                                            ) : (
                                                <></>
                                            )

                                            }
                                        </>
                                    ) : (
                                        <></>
                                    )

                                    }
                                </>
                            ) : (
                                <></>
                            )
                        }

                    </>
                    <div className='w-full flex items-center justify-center'>
                        {eDay && sDay ? (
                            <>
                                <button
                                    className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)]  md:w-3/12  w-1/2 font-medium text-white rounded-md bg-gradient-to-r from-blue-800 to-purple-800 py-2'
                                    onClick={getHist}
                                >{
                                        lang ? (
                                            <>
                                                Complete the search

                                            </>) : (
                                            <>
                                                Concluir a busca
                                            </>)
                                    }</button>
                            </>
                        ) : (
                            <>
                                {
                                    histState ? (<>
                                        <>

                                            <button
                                                className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] md:w-3/12 flex flex-col items-center  w-1/2 font-medium text-white rounded-md bg-gradient-to-r from-blue-800 to-purple-800 py-2'

                                            ><BiLoaderAlt className='text-xl font-medium animate-spin cols-span-3 ' /></button>
                                        </>
                                    </>) : (
                                        <>

                                            <button
                                                className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] md:w-3/12 w-1/2 font-medium text-white rounded-md bg-gradient-to-r from-blue-800 to-purple-800 py-2'
                                                onClick={getYOptions}
                                            >{
                                                    lang ? (
                                                        <>
                                                            Start a search

                                                        </>) : (
                                                        <>
                                                            Inicie uma busca
                                                        </>)
                                                }</button>
                                        </>
                                    )
                                }
                            </>

                        )
                        }
                        <button
                            className='ml-4 my-2 py-3 flex items-center justify-center backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] w-10 font-medium text-white rounded-md bg-gradient-to-r from-purple-800 to-blue-800'
                        ><TbFileExport className='text-md font-medium' /></button>
                    </div>

                </div>
            </div>
        </div >

    </>
    );
}

export default A2Data;