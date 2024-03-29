const About = ({lang}) => {
    return (<>
        <div className=" flex flex-col justify-center items-center mb-20">
            <h2 className="w-4/5 font-semibold text-center md:text-xl sm:text-lg text-md my-2">
                {lang ? (
                    <>
                        A²Database is a Carbon Dioxide and Volatile Organic Compounds Monitoring Platform.
                    </>
                ) : (<>
                    A²Database é uma Plataforma de Monitoramento de Dióxido  de <br /> Carbono e Compostos Orgânicos Voláteis.
                </>)}
            </h2>
            <p className=" w-[90%] font-normal sm:text-base  md:text-xl text-center text-sm" >
                {lang ? (
                    <>
                        The website is aimed at democratically providing real-time and updated information on the environmental conditions in which the project is applied, as well as serving as an early warning system for the occurrence of nearby wildfires.
                    </>
                ) : (<>
                    Website voltado para a disponibilização democrática de informações reais e atualizadas das  condições ambientais em que o projeto seja aplicado além de funcionar como um alerta prévio da  ocorrência de queimadas próximas.
                </>)}
            </p>
        </div >
    </>);
}

export default About;