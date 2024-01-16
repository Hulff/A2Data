import { useState } from "react";
import { test, menu, close } from "../assets"
import { navLinks } from "../constants";
import { RiArrowGoBackFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUserGear } from "react-icons/fa6";
function NavBar({ user }) {
    const navigate = useNavigate();
    const [toggle, settoggle] = useState(false);
    return (
        <nav className="w-full flex justify-between items-center pt-2 navbar">
            <div className=" w-auto flex items-center"> <img onClick={() => {
                navigate("/")
            }} src={test} alt="logo" className="w-auto h-16 cursor-pointer" />
                <h1 onClick={() => {
                    navigate("/")
                }} className=" cursor-pointer w-auto font-poppins pl-2 text-sm sm:text-base text-white font-medium">Araripe Atmospheric Database</h1></div>
            <div className="w-auto flex sm:mr-4 mr-2">
                {
                    user ? (
                        <>
                            <div onClick={() => {
                                navigate("/Account")
                            }} className="w-auto cursor-pointer flex justify-center items-center">
                                <FaUserGear className="text-white text-xl h-18" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div onClick={() => {
                                navigate("/Login")
                                }} className="w-auto cursor-pointer flex justify-center items-center">
                                <FaUserPlus className="text-white text-xl h-18" />
                            </div>
                        </>
                    )
                }


                <div className="sm:hidden w-auto  cursor-pointer ml-5 flex justify-center items-center">
                    <RiArrowGoBackFill onClick={() => {
                        navigate(-1)
                    }} className="text-white font-medium text-lg"></RiArrowGoBackFill>

                </div>
            </div>
        </nav>
    )
}

export default NavBar;