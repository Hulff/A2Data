const ButtonsLinks = ({btnFunctions}) => {
    return (<>
        <div className=" w-full h-11 flex flex-row mt-5 items-stretch justify-evenly">
            <button onClick={btnFunctions[1]} className="transition-all text-white bg-gradient-to-r from-purple-800 to-blue-800 font-semibold  md:w-1/4 md:hover:w-1/3 w-1/2 justify-center text-center items-center rounded-md flex  sm:text-lg sm:w-1/3  text-med h-auto hover:brightness-75 sm:hover:w-5/12 hover:w-7/12 md:hover:w-1/5  ">A²Database</button>
        </div>
    </>);
}

export default ButtonsLinks;