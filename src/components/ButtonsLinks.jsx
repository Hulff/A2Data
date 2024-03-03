import {
    useNavigate,
} from "react-router-dom";
import { logo } from "../assets";
const ButtonsLinks = () => {
    const navigate = useNavigate()
    return (<>
        <div className=" w-full h-20 flex flex-row mt-5 items-stretch justify-evenly">
            <div className=" w-full h-full flex flex-row  items-center justify-center ">
                <div onClick={() => {
                    navigate("/A2Data")
                }} className=" transition-all cursor-pointer rounded-lg sm:w-[220px] w-2/5 xs:w-4/12  pr-4 pl-4 h-full flex flex-row items-center justify-center  bg-[#d1d3d4]">
                    <img className="w-[70%] h-[70%]" src={logo}></img>
                </div>
                <button onClick={() => {
                    navigate("/A2Data")
                }} className="transition-all ml-[-5%] md:ml-[-1.5%]  w-auto px-3 relative z-[1] py-5 h-[30%] text-white bg-[rgb(62,64,149)] font-semibold   justify-center text-center items-center rounded-md flex  text-sm h-auto hover:brightness-75  ">
                    Acessar o Banco de Dados</button>
            </div>
        </div>
    </>);
}

export default ButtonsLinks;
