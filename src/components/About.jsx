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
                        This website is intended to provide free access to real and updated atmospheric data collected in the Araripe National Forest. In general, the project seeks to generate relevant information about environmental conditions, primarily focusing on air quality monitoring in the Forest. It can also be applied as an early warning system for the occurrence of wildfires near the inhabited region of Chapada do Araripe
                    </>
                ) : (<>
                        Este website é destinado à disponibilização gratuita de dados atmosféricos reais e atualizados coletados na Floresta Nacional do Araripe. De modo geral, o projeto busca gerar informações relevantes das condições ambientais, sob o escopo principal do monitoramento da qualidade do ar da Floresta, podendo ser aplicado como um sistema de alerta prévio da ocorrência de queimadas próximas a região habitada da Chapada do Araripe.
                </>)}
            </p>
        </div >
    </>);
}

export default About;