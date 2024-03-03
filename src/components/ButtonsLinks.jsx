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
                }} className=" transition-all cursor-pointer rounded-lg md:w-[320px] sm:w-[220px] w-2/5 xs:w-4/12  pr-4 pl-4  flex flex-row items-center justify-center  bg-[#d1d3d4]">
                    <img className="w-[60%] h-full py-3" src={logo}></img>
                </div>
                <button onClick={() => {
                    navigate("/A2Data")
                }} className="transition-all ml-[-5%] sm:ml-[-3%]   w-auto px-3 relative z-[1] md:py-7 py-5 h-[30%] text-white bg-[rgb(62,64,149)] font-semibold   justify-center text-center items-center rounded-md flex lg:text-xl md:text-lg sm:text-base  text-xs hover:brightness-75  ">
                    Acessar o Banco de Dados</button>
            </div>
        </div>
    </>);
}

export default ButtonsLinks;
