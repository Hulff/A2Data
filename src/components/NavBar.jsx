import { useState } from "react";
import { logo, menu, close } from "../assets/svg"
import { navLinks } from "../constants";

function NavBar() {
    const [toggle, settoggle] = useState(false);
    return (
        <nav className="w-full flex py-6 justify-between items-center navbar">
            <img src={logo} alt="logo" className="w-[124px] h-[32px]" />
            <ul className="list-none sm:flex hidden justify-end items-center flex-1">
                {navLinks.map((nav, index) => (
                    <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}>
                        <a href={`#${nav.id}`}>
                            {nav.title}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="sm:hidden flex flex-1 justify-end items-center">
                <img src={toggle ? close : menu} alt="menu-mobile" className="w-[28px] h-[28px] object-contain" onClick={() => settoggle((prev) => !prev)} />
                <div className={`${!toggle ? "hidden" : "flex"} p-6 bg-gradient-to-b from-green-400 to-green-700 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
                    <ul className="list-none flex flex-col justify-end items-center flex-1">
                        {navLinks.map((nav, index) => (
                            <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}>
                                <a href={`#${nav.id}`}>
                                    {nav.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;