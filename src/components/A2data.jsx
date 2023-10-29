import { useEffect, useRef, useState } from 'react';
import { getData, db, createEndOfDayDate, createStartOfDayDate, getOptions } from "../services/firebase";
import { collection, onSnapshot, orderBy, limit, query, where } from "firebase/firestore";

import { AiOutlineSearch } from "react-icons/ai"
import { BiLoaderAlt } from "react-icons/bi"
import { TbFileExport } from "react-icons/tb"

const A2Data = () => {
    const [state, setState] = useState(null)
    const [id, setId] = useState('0');
    const [histId, setHistId] = useState('');
    const [data, setData] = useState(null);
    const [histData, setHistData] = useState([]);
    const endDate = useRef(null)
    const removeListener = useRef(null)
    const startDate = useRef(null)
    const [years, setY] = useState(null)
    const [months, setM] = useState(null)
    const yearOpt = useRef(null)

    const handleDataReceived = (newData) => {
        console.log("Dados atualizados");
        const attData = { ...newData }
        setData(attData)
    };

    useEffect(() => {
        if (years) {

            console.log(Object.keys(years))
        }
    }, [years])


    const getYOptions = async () => {
        const options = await getOptions(histId);
        setY(options);
    }


    const histListener = () => {
        const q = query(collection(db, "sensors", "data", id), where("serverTime", "<=", `${endDate}`), where("serverTime", ">=", `${startDate}`), orderBy("serverTime", "desc"), limit(1));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let dbData = null;
            snapshot.forEach((doc) => {
                dbData = doc.data();
            });

            if (dbData) {
                console.log("data");
                handleDataReceived(dbData);
            } else {
                console.log("Nenhum dado encontrado.");
            }
        });

        return unsubscribe;
    }



    return (<>
        <div className=' my-6 w-full flex flex-col items-center'>
            <div className='backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] transition-all flex-col flex items-center h-fit min-h-[20em] w-3/5 flex justify-start text-white bg-gradient-to-r from-purple-800 to-blue-800  rounded-xl pt-4 py-2 pb-6 '>
                {data ? (
                    <>
                        {
                            Object.keys(data)
                                .sort()
                                .filter(key => key !== "serverTime")
                                .map(key => (
                                    <label key={key} className='w-4/5 mb-2 flex items-center text-white bg-gradient-to-r from-purple-900 to-blue-900 rounded-md py-1 pl-3'>
                                        <h3>{key}</h3>
                                        <input
                                            onChange={() => { }}
                                            value={data[key]}
                                            className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-md'
                                        />
                                    </label>
                                ))
                        }

                    </>
                ) : (
                    <>
                        <h2 className='font-medium'>Inicie uma busca</h2>
                        <input className='animate-pulse pl-2 my-3 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                    </>
                )}
            </div>
        </div>

        <div className='mb-20 w-full flex items-center flex-col '>
            <label className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] w-1/2 mb-2 flex items-center text-white bg-gradient-to-r from-purple-800 to-blue-800  rounded-md py-1 pl-3 '>
                <AiOutlineSearch className='text-xl' />
                <input placeholder='Insira o Id do sensor'
                    className='  font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1  text-md '
                    onChange={(e) => { setId(e.currentTarget.value) }} />
            </label>
            {
                state ? (
                    <>
                        <button className=' grid-cols-3 grid backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] w-1/3 font-medium text-white rounded-md bg-gradient-to-r from-purple-800 to-blue-800 py-1'
                            onClick={() => {
                                if (removeListener.current) {
                                    removeListener.current(); // Call the function to unsubscribe
                                    removeListener.current = null; // Reset the ref
                                }
                                setState(null);
                            }}><BiLoaderAlt className='text-xl font-medium align-self-center ml-5 animate-spin cols-span-3 ' /><p className=''>Parar</p></button>
                    </>
                ) : (
                    <>
                        <button className='backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] w-1/3 font-medium text-white rounded-md bg-gradient-to-r from-purple-800 to-blue-800 py-1'
                            onClick={() => {
                                const unsubscribe = onSnapshot(query(collection(db, "sensors", "data", id), orderBy("serverTime", "desc"), limit(1)), (snapshot) => {
                                    let dbData = null;
                                    snapshot.forEach((doc) => {
                                        dbData = doc.data();
                                    });

                                    if (dbData) {
                                        setData(dbData);
                                    } else {
                                        console.log("Nenhum dado encontrado.");
                                    }

                                });
                                removeListener.current = unsubscribe
                                setState(true)
                            }}>Buscar</button>
                    </>
                )
            }

        </div>

        <div className=' my-6 w-full flex flex-col items-center'>
            <div className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] transition-all flex-col flex items-center h-fit min-h-[20em] w-3/5 flex justify-start text-white bg-gradient-to-r from-purple-800 to-blue-800  rounded-xl pt-4 py-2 pb-6 '>
                {histData.length > 0 ? (
                    <>
                    </>
                ) : (
                    <>
                        <h2 className='font-medium'>Histórico</h2>
                        <input className='animate-pulse pl-2 my-3 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input className='animate-pulse pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                    </>
                )}
            </div>
        </div>
        <div className='mb-20 w-full flex items-center flex-col '>
            {data ? (
                <>
                </>
            ) : (
                <>
                    <label className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] w-1/2 mb-2 flex items-center text-white bg-gradient-to-r from-purple-800 to-blue-800  rounded-md py-1 pl-3 '>
                        <AiOutlineSearch className='text-xl' />
                        <input placeholder='Insira o Id do sensor'
                            className='  font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1  text-md '
                            onChange={(e) => { setHistId(e.currentTarget.value) }} />
                    </label>
                    {
                        years ? (
                            <>
                                <label className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] w-1/2 mb-2 flex items-center text-white bg-gradient-to-r from-purple-800 to-blue-800  rounded-md py-1 pl-3 '>
                                    <select onChange={(e) => {
                                        console.log(e.target.value)
                                        yearOpt.current = e.target.value
                                    }} className='font-medium bg-transparent focus-visible:outline-0 w-11/12 placeholder:text-white text-white px-2 py-1 text-md'>
                                        <option defaultValue="" disabled selected hidden>Escolha um ano</option>
                                        {Object.keys(years).map((key) => (
                                            <option value={key} key={key}>{key}</option>
                                        ))}
                                    </select>
                                </label>
                                {yearOpt ? (
                                    <>
                                        <label className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] w-1/2 mb-2 flex items-center text-white bg-gradient-to-r from-purple-800 to-blue-800  rounded-md py-1 pl-3 '>
                                            <select onChange={(e) => {
                                                // console.log(e.target.value)
                                                // yearOpt.current = e.target.value
                                            }} className='font-medium bg-transparent focus-visible:outline-0 w-11/12 placeholder:text-white text-white px-2 py-1 text-md'>
                                                <option defaultValue="" disabled selected hidden>Escolha um mês</option>
                                                {Object.keys(years[`${yearOpt.current}`]).map((key) => (
                                                    <option value={key} key={key}>{key}</option>
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
            )}
            <div className='w-full flex items-center justify-center'>

                <button
                    className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] w-1/3 font-medium text-white rounded-md bg-gradient-to-r from-purple-800 to-blue-800 py-1'
                    onClick={getYOptions}
                >Iniciar busca</button>
                <button
                    className='ml-4 my-2 py-2 flex items-center justify-center backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] w-10 font-medium text-white rounded-md bg-gradient-to-r from-blue-800 to-purple-800 py-1'
                ><TbFileExport className='text-md font-medium' /></button>
            </div>

        </div>

    </>
    );
}

export default A2Data;