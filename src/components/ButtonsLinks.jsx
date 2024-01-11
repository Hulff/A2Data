const ButtonsLinks = ({btnFunctions}) => {
    return (<>
        <div className=" w-full h-20 flex flex-row mt-5 items-stretch justify-evenly">
            <button onClick={btnFunctions[1]}  className="transition-all text-white bg-gradient-to-r from-blue-800 to-emerald-500 font-medium md:w-1/6 w-1/4 justify-center text-center items-center px-2 py-4 rounded-md flex  sm:text-base text-sm hover:brightness-50 hover:w-1/3 md:hover:w-1/5  ">A²Database</button>
            <button onClick={btnFunctions[2]} className="transition-all text-white bg-gradient-to-r from-emerald-500 to-[#42eb29] font-medium md:w-1/6 w-1/4 justify-center text-center items-center px-2 py-4 rounded-md flex  sm:text-base text-sm hover:brightness-50 hover:w-1/3 md:hover:w-1/5  "  >
                <p>O Araripe está em chamas!</p>
            </button>
        </div>
    </>);
}

export default ButtonsLinks;