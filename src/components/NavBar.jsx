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
        <nav className="w-full flex items-center pt-2 navbar">
            <img onClick={() => {
                navigate("/")
            }} src={test} alt="logo" className="w-auto h-16 " />
            <h1 onClick={() => {
                navigate("/")
            }} className=" w-auto font-poppins px-2 text-sm sm:text-base text-white font-medium">Araripe Atmospheric Database</h1>
            <ul className="list-none sm:flex hidden justify-end items-center flex-1">
                {/* {navLinks.map((nav, index) => (
                    <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}>
                        <a href={`#${nav.id}`}>
                            {nav.title}
                        </a>
                    </li>
                ))} */}
            </ul>
            {
                user ? (
                    <>
                        <div onClick={() => {
                            navigate("/Account")
                        }} className="w-1/12 pr-2 flex justify-center items-center">
                            <FaUserGear className="text-white text-2xl h-18" />
                        </div>
                    </>
                ) : (
                    <>
                        <div onClick={() => {
                            navigate("/Login")
                        }} className="w-1/12 pr-2 flex justify-center items-center">
                            <FaUserPlus className="text-white text-2xl h-18" />
                        </div>
                    </>
                )
            }


            <div className="sm:hidden flex flex-1 justify-end items-center">
                <RiArrowGoBackFill onClick={() => {
                    navigate(-1)
                }} className="text-white font-medium text-xl"></RiArrowGoBackFill>
                {/* <img src={toggle ? close : menu} alt="menu-mobile" className="w-[28px] h-[28px] object-contain" onClick={() => settoggle((prev) => !prev)} /> */}
                {/* <div className={`${!toggle ? "hidden" : "flex"} p-6 bg-gradient-to-b from-purple-700 via-blue-700 to-emerald-500 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
                    <ul className="list-none flex flex-col justify-end items-center flex-1">
                        {navLinks.map((nav, index) => (
                            <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}>
                                <a href={`#${nav.id}`}>
                                    {nav.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div> */}
            </div>
        </nav>
    )
}

export default NavBar;