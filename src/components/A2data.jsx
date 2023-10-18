import { useState } from 'react';
import { getData, dbListener } from "../services/firebase";
import { AiOutlineSearch } from "react-icons/ai"
const A2Data = ({ }) => {
    const [id, setId] = useState("")
    const [data, setData] = useState([])
    const submit = async () => {
        console.log(id);
        let d = await getData(id);
        if (d) {
            setData(d);
        } else {
            console.log("não existe")
        }
    
    };



    return (<>
        <div className=' my-6 w-full flex flex-col items-center'>
            <div className='backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] transition-all flex-col flex items-center h-fit min-h-[20em] w-3/5 flex justify-start text-white bg-gradient-to-r from-purple-800 to-blue-800  rounded-xl pt-4 py-2 pb-6 '>
                {data ? (
                    <>
                        {/* {Object.keys(data).map((key) => (
                            <label className='w-1/2 mb-2 flex items-center text-white bg-gradient-to-r from-purple-800 to-blue-800 rounded-md py-1 pl-3' key={key}>
                                <h3>{key}</h3>
                                <input
                                    value={data[key]}
                                    className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-md'
                                />
                            </label>
                        ))} */}
                        <label className='w-4/5 mb-2 flex items-center text-white bg-gradient-to-r from-purple-900 to-blue-900 rounded-md py-1 pl-3'>
                            <h3>Altitude</h3>
                            <input
                                value={"391.91 m"}
                                className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-md'
                            />
                        </label>
                        <label className='w-4/5 mb-2 flex items-center text-white bg-gradient-to-r from-purple-900 to-blue-900 rounded-md py-1 pl-3'>
                            <h3>Bateria</h3>
                            <input
                                value={"90%"}
                                className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-md'
                            />
                        </label>
                        <label className='w-4/5 mb-2 flex items-center text-white bg-gradient-to-r from-purple-900 to-blue-900 rounded-md py-1 pl-3'>
                            <h3>Co²</h3>
                            <input
                                value={"384.43 ppm"}
                                className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-md'
                            />
                        </label>
                        <label className='w-4/5 mb-2 flex items-center text-white bg-gradient-to-r from-purple-900 to-blue-900 rounded-md py-1 pl-3'>
                            <h3>Pressão</h3>
                            <input
                                value={"96708.31 Kpa"}
                                className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-md'
                            />
                        </label>
                        <label className='w-4/5 mb-2 flex items-center text-white bg-gradient-to-r from-purple-900 to-blue-900 rounded-md py-1 pl-3'>
                            <h3>Temperatura</h3>
                            <input
                                value={"19.64 °C"}
                                className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-md'
                            />
                        </label>
                        <label className='w-4/5 mb-2 flex items-center text-white bg-gradient-to-r from-purple-900 to-blue-900 rounded-md py-1 pl-3'>
                            <h3>Umidade</h3>
                            <input
                                value={"52.83%"}
                                className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-md'
                            />
                        </label>
                        <label className='w-4/5 mb-2 flex items-center text-white bg-gradient-to-r from-purple-900 to-blue-900 rounded-md py-1 pl-3'>
                            <h3>Voc's</h3>
                            <input
                                value={"0.0 ppm"}
                                className='font-medium bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2 py-1 text-md'
                            />
                        </label>
                    </>
                ) : (
                    <>
                        <h2 className='font-medium'>Inicie uma busca</h2>
                        <input className='pl-2 my-3 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input className='pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input className='pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input className='pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input className='pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
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
            <button
                className='backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] w-1/3 font-medium text-white rounded-md bg-gradient-to-r from-purple-800 to-blue-800 py-1'
                onClick={submit}>Buscar</button>
        </div>

        <div className=' my-6 w-full flex flex-col items-center'>
            <div className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] transition-all flex-col flex items-center h-fit min-h-[20em] w-3/5 flex justify-start text-white bg-gradient-to-r from-purple-800 to-blue-800  rounded-xl pt-4 py-2 pb-6 '>
                {data ? (
                    <>
                    </>
                ) : (
                    <>
                        <h2 className='font-medium'>Acessar Historico</h2>
                        <input placeholder='Insira o Id do sensor' className='placeholder:text-white py-1 pl-2 my-3 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input placeholder='Insira o mês' className='placeholder:text-white py-1 pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input placeholder='Insira o dia' className='placeholder:text-white py-1 pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                        <input placeholder='Insira o ano' className='placeholder:text-white py-1 pl-2 my-1 focus-visible:outline-0 border-white border-2 rounded-lg bg-transparent'></input>
                    </>
                )}
            </div>
        </div>
        <div className='mb-20 w-full flex items-center flex-col '>
            <button
                className=' backdrop-blur-lg shadow-[0_0_10px_1px_rgba(0,0,0,.25)] w-1/3 font-medium text-white rounded-md bg-gradient-to-r from-purple-800 to-blue-800 py-1'
                onClick={submit}>Buscar</button>
        </div>

    </>
    );
}

export default A2Data;