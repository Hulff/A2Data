import { useState } from 'react';
import { getData, dbListener } from "../services/firebase";
import { AiOutlineSearch } from "react-icons/ai"
const A2Data = ({ }) => {
    const [id, setId] = useState("")
    const submit = () => {
        console.log("CLICK")
    }

    return (<>
        <div className='flex flex-col '>
            <label className='flex items-center text-white bg-gradient-to-r from-purple-800 to-blue-800 w-2/12 rounded-md py-1 pl-3 '>
                <AiOutlineSearch className='text-xl'/>
                <input placeholder='Insira o Id'
                    className='bg-transparent focus-visible:outline-0 w-full placeholder:text-white text-white pl-2  text-md '
                    onChange={(e) => { setId(e.currentTarget.value) }} />
            </label>
            <button
                className='w-2/12 text-white rounded-md bg-gradient-to-r from-purple-800 to-blue-800 py-1'
                onClick={submit}>Submit</button>
        </div>
    </>);
}

export default A2Data;