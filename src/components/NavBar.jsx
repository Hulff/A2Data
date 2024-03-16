import { useState } from "react";
import { logo, menu, close } from "../assets"
import { navLinks } from "../constants";
import { RiArrowGoBackFill } from "react-icons/ri"
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserPlus, FaUserGear } from "react-icons/fa6";
function NavBar({ user,lang }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [toggle, settoggle] = useState(false);

    return (
        <nav className="w-full flex justify-between items-center navbar">
            <div className=" w-[80%] flex items-end">
                <div className=" w-auto flex items-end"> <img onClick={() => {
                    navigate("/")
                }} src={logo} alt="logo" className="w-auto h-12 xs:h-16 sm:h-20 cursor-pointer" /></div>

                <h1 onClick={() => {
                    navigate("/")
                }} className=" cursor-pointer w-auto font-bebas pl-2 text-lg xs:text-xl ss:text-2xl sm:text-3xl sm:leading-7 lg:text-4xl lg:leading-8 ss:leading-6 xs:leading-5  leading-4 text-[rgb(62,64,149)] ">
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
                </h1></div>
            <div className="w-[20%] h-full flex items-end  justify-center sm:w-[10%] md:w-[8%]">
                {
                    user ? (
                        <>
                            <div onClick={() => {
                                navigate("/Account")
                            }} className="w-auto cursor-pointer flex justify-center items-center">
                                <FaUserGear className="text-[rgb(62,64,149)] text-2xl h-18" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div onClick={() => {
                                navigate("/Login")
                            }} className="w-auto cursor-pointer flex justify-center items-center">
                                <FaUserPlus className="text-[rgb(62,64,149)] lg:text-4xl sm:text-3xl text-2xl h-18" />
                            </div>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default NavBar;