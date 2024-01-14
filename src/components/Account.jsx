import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai'
const Account = ({ user }) => {
    const [userData, setUserData] = useState()
    return (<>
        <div className='w-[100%] flex justify-center mt-10 '>
            <div className='duration-500 transition-all ml-[1%] w-[80%] my flex flex-row items-center shadow-lg rounded justify-center'>
                <div className='flex flex-col items-start justify-center sm:w-1/2 w-full py-5 pb-16 md:pb-36'>
                    <h2 className='font-bold text-4xl w-full text-center mb-2 ml-4'>
                        <AiOutlineUser />
                    </h2>
                    <label className='w-10/12 px-1 font-medium ml-2'>
                        E-mail
                    </label>
                    <h3 className='w-10/12 px-1 ml-2'>{
                        user ? (user.email) : (<></>)
                    }</h3>
                    <h3>Sensores</h3>
                    <form className='flex flex-col items-center justify-center w-full'>
                        <input className='w-10/12 border-2 rounded px-1' placeholder='digite o codigo que deseja usar'/>
                        <button>Adicionar sensor</button>
                    </form>
                    <ul>
                        <li>sensor219847</li>
                    </ul>
                </div>
            </div>
        </div>
    </>);
}

export default Account;