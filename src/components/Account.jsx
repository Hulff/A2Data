import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai'
import { FaRegTrashCan } from "react-icons/fa6";
import { RiPencilLine } from "react-icons/ri";
import { editUserData } from '../services/firebase';
const Account = ({ user, userData, setData }) => {
    const converterParaDataBr = (timestamp) => {
        const data = new Date(parseFloat(timestamp));
        const opcoes = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/Sao_Paulo' };
        const formatoData = new Intl.DateTimeFormat('pt-BR', opcoes);

        return formatoData.format(data);
    }
    const editData = async (e) => {
        e.preventDefault();
        try {
            // Assuming editUserData updates the user data in the backend
            const newData = { ...userData, sensors: [...userData.sensors, e.target.children[0].value] };
            await editUserData(user.uid, newData); // Replace editUserData with your actual function
            // Assuming setData updates the local state with the new user data
            setData(newData);
        } catch (error) {
            console.error("Error editing data:", error);
            // Handle the error if needed
        }
    };
    const removeData = async (sensorValue) => {
        try {
            // Assuming editUserData updates the user data in the backend
            const newData = { ...userData, sensors: [...userData.sensors.filter(item => item !== sensorValue)] };
            await editUserData(user.uid, newData); // Replace editUserData with your actual function
            // Assuming setData updates the local state with the new user data
            setData(newData);
        } catch (error) {
            console.error("Error editing data:", error);
            // Handle the error if needed
        }
    };


    useEffect(() => {
        console.log(userData)
    }, [userData])
    return (<>
        <div className='w-[100%]  flex justify-center mt-10 '>
            <div className='duration-500 transition-all ml-[1%] w-[80%]  flex flex-row items-center shadow-lg rounded sm:justify-start justify-center'>
                <div className='flex flex-col items-start justify-center  w-full py-5 pb-16 md:pb-36'>
                    <h2 className='font-bold text-4xl w-full text-center mb-2 ml-4'>
                        <AiOutlineUser />
                    </h2>
                    <label className='w-10/12 px-1 font-medium ml-2'>
                        E-mail
                    </label>
                    <h3 className='w-10/12 px-1 ml-2'>{
                        user ? (user.email) : (<></>)
                    }</h3>
                    <h3 className='text-gray-400 w-10/12 px-1 ml-2'>{
                        user ? (converterParaDataBr(user.metadata.createdAt)) : (<></>)
                    }</h3>
                    <h3 className='w-full border-b-2 px-3 text-lg font-medium my-3'>Sensores</h3>
                    <form onSubmit={editData} className='h-26 flex sm:flex-row flex-col sm:justify-center items-center space-x-3 justify-top sm:px-2 w-full my-2'>
                        <input className='outline-none sm:w-2/3 w-10/12 border-2 sm:text-lg rounded px-2 py-2' placeholder='Digite o codigo que deseja usar' />
                        <button type='submit' className='transition-all sm:w-1/4 text-white bg-gradient-to-r from-purple-800 to-blue-800 font-semibold  md:w-1/4 md:hover:w-1/3 w-1/2 justify-center text-center items-center rounded-md flex  sm:text-lg sm:w-1/3 text-sm h-auto hover:brightness-75 sm:hover:w-5/12 hover:w-7/12 md:hover:w-1/5 sm:py-2 py-1 my-4  '>Adicionar sensor</button>
                    </form>
                    <ul className='overflow-y-scroll overflow-x-clip ulSensors  ml-[10%] rounded w-[80%] flex-col border-gray-300 border-[1px] p-2 h-[30vh] shadow-lg'>
                        {userData && userData.sensors && userData.sensors.length > 0 && (
                            <>
                                {userData.sensors.map((e) => (
                                    <li key={e} className='w-full justify-between flex flex-row border-gray-400 border-[1px] rounded p-1 px-2 font-medium my-2 '>
                                        <input defaultValue={e} className='outline-none w-[70%]' readOnly={true} />
                                        <div className='max-w-[80px] justify-center flex space-x-2 items-center border-[1px] border-black rounded px-1'>
                                            <div onClick={(e) => {
                                                const target = e.target.children[0];
                                                target.active = !target.active;
                                                if (target.active) {
                                                    target.classList.add("animate-wiggle");
                                                } else {
                                                    target.classList.remove("animate-wiggle");
                                                }
                                                e.target.parentNode.parentNode.children[0].readOnly = !target.active;
                                                if (target.active) {
                                                    e.target.parentNode.parentNode.children[0].focus();
                                                }
                                            }}>
                                                <RiPencilLine className='text-xl pointer-events-none' />
                                            </div>
                                            <div onClick={(e) => {
                                                removeData(e.target.parentNode.parentNode.children[0].value)
                                            }}>
                                                <FaRegTrashCan className='text-md pointer-events-none' />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </>);
}

export default Account;